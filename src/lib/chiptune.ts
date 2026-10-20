// 바그너 「결혼행진곡」(로엔그린, 퍼블릭 도메인)을 Web Audio로 직접 합성하는 8비트 BGM.
// 음원 파일이 없으므로 녹음물 저작인접권 문제가 없고, 용량도 들지 않는다.

const BPM = 84;
const BEAT = 60 / BPM;
const LOOP_REST_BEATS = 2;
const MASTER_VOLUME = 0.1;
// 스케줄러: 100ms마다 0.6초 앞까지 음표를 미리 예약한다
const TICK_MS = 100;
const LOOKAHEAD_S = 0.6;

type Note = [pitch: string | null, beats: number];

const NOTE_INDEX: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function frequency(pitch: string) {
  const match = /^([A-G])(b|#)?(\d)$/.exec(pitch);
  if (!match) throw new Error(`잘못된 음: ${pitch}`);
  const [, name, accidental, octave] = match;
  const semitone = NOTE_INDEX[name] + (accidental === "b" ? -1 : accidental === "#" ? 1 : 0);
  const midi = (Number(octave) + 1) * 12 + semitone;
  return 440 * 2 ** ((midi - 69) / 12);
}

// 멜로디 (F장조). 한 줄이 한 소절 구(못갖춘마디 포함)
const MELODY: Note[] = [
  ["C4", 1], ["F4", 1.5], ["F4", 0.5], ["F4", 2],
  ["C4", 1], ["G4", 1.5], ["E4", 0.5], ["F4", 2],
  ["C4", 1], ["F4", 1.5], ["Bb4", 0.5], ["Bb4", 1], ["A4", 1.5], ["G4", 0.5],
  ["F4", 1], ["E4", 1.5], ["F4", 0.5], ["G4", 2],
  ["C4", 1], ["F4", 1.5], ["F4", 0.5], ["F4", 2],
  ["C4", 1], ["G4", 1.5], ["E4", 0.5], ["F4", 2],
  ["C4", 1], ["F4", 1.5], ["A4", 0.5], ["C5", 1], ["A4", 1.5], ["F4", 0.5],
  ["D4", 1], ["F4", 1.5], ["G4", 0.5], ["F4", 2],
];

// 베이스 근음. 멜로디 각 줄과 길이가 같도록 맞춘다 (5, 5, 6, 5, 5, 5, 6, 5박)
const BASS: Note[] = [
  ["F2", 5],
  ["C3", 3], ["F2", 2],
  ["F2", 3], ["Bb2", 3],
  ["C3", 5],
  ["F2", 5],
  ["C3", 3], ["F2", 2],
  ["F2", 3], ["F2", 3],
  ["Bb2", 2.5], ["C3", 0.5], ["F2", 2],
];

const totalBeats = (notes: Note[]) => notes.reduce((sum, [, beats]) => sum + beats, 0);
const LOOP_BEATS = Math.max(totalBeats(MELODY), totalBeats(BASS)) + LOOP_REST_BEATS;

type Voice = {
  notes: Note[];
  type: "pulse" | "triangle";
  gain: number;
  /** 지정하면 긴 음을 이 박 단위로 끊어 반복 (도트 게임식 통통 튀는 베이스) */
  pulseBeats?: number;
};

const VOICES: Voice[] = [
  { notes: MELODY, type: "pulse", gain: 0.55 },
  { notes: BASS, type: "triangle", gain: 0.9, pulseBeats: 1 },
];

/** 듀티 25% 펄스파 (패미컴풍 리드 음색) */
function pulseWave(context: AudioContext) {
  const harmonics = 32;
  const real = new Float32Array(harmonics);
  const imag = new Float32Array(harmonics);
  for (let n = 1; n < harmonics; n++) {
    imag[n] = (2 / (n * Math.PI)) * Math.sin(n * Math.PI * 0.25);
  }
  return context.createPeriodicWave(real, imag);
}

export type Chiptune = {
  /** 사용자 제스처 안에서 호출해야 소리가 난다 */
  play: () => void;
  pause: () => void;
  dispose: () => void;
};

export function createChiptune(): Chiptune {
  let context: AudioContext | null = null;
  let master: GainNode | null = null;
  let wave: PeriodicWave | null = null;
  let timer: ReturnType<typeof setInterval> | undefined;
  let loopStart = 0;
  // 각 성부가 다음으로 예약할 음표 위치
  let cursors = VOICES.map(() => ({ index: 0, time: 0 }));

  const playNote = (voice: Voice, pitch: string, start: number, duration: number) => {
    if (!context || !master) return;
    const oscillator = context.createOscillator();
    if (voice.type === "pulse" && wave) oscillator.setPeriodicWave(wave);
    else oscillator.type = "triangle";
    oscillator.frequency.value = frequency(pitch);

    // 짧은 어택 → 약간 줄어든 서스테인 → 음 끝 직전 릴리스 (음 사이를 살짝 끊어 도트 게임 느낌)
    const envelope = context.createGain();
    const end = start + duration * 0.92;
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.linearRampToValueAtTime(voice.gain, start + 0.01);
    envelope.gain.linearRampToValueAtTime(voice.gain * 0.7, start + 0.12);
    envelope.gain.setValueAtTime(voice.gain * 0.7, end - 0.03);
    envelope.gain.linearRampToValueAtTime(0, end);

    oscillator.connect(envelope).connect(master);
    oscillator.start(start);
    oscillator.stop(end + 0.02);
  };

  const schedule = () => {
    if (!context) return;
    const horizon = context.currentTime + LOOKAHEAD_S;

    VOICES.forEach((voice, v) => {
      const cursor = cursors[v];
      while (loopStart + cursor.time < horizon) {
        if (cursor.index >= voice.notes.length) {
          // 이 성부는 이번 루프를 다 예약함 → 모든 성부가 끝나면 다음 루프로
          cursor.time = Infinity;
          break;
        }
        const [pitch, beats] = voice.notes[cursor.index];
        if (pitch) {
          const step = voice.pulseBeats ?? beats;
          for (let offset = 0; offset < beats; offset += step) {
            playNote(voice, pitch, loopStart + cursor.time + offset * BEAT, Math.min(step, beats - offset) * BEAT);
          }
        }
        cursor.time += beats * BEAT;
        cursor.index++;
      }
    });

    if (cursors.every((cursor) => cursor.time === Infinity)) {
      loopStart += LOOP_BEATS * BEAT;
      cursors = VOICES.map(() => ({ index: 0, time: 0 }));
    }
  };

  return {
    play() {
      if (!context) {
        context = new AudioContext();
        wave = pulseWave(context);
        master = context.createGain();
        master.gain.value = MASTER_VOLUME;
        master.connect(context.destination);
        loopStart = context.currentTime + 0.1;
      }
      void context.resume();
      if (!timer) {
        schedule();
        timer = setInterval(schedule, TICK_MS);
      }
    },
    pause() {
      void context?.suspend();
    },
    dispose() {
      clearInterval(timer);
      timer = undefined;
      void context?.close();
      context = null;
    },
  };
}
