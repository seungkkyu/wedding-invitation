import { Icon } from "./Icon";

type CallButtonsProps = {
  name: string;
  phone: string;
  /** 버튼 묶음 */
  className?: string;
  /** 버튼 하나 (모양·테두리·색) */
  buttonClassName?: string;
  iconClassName?: string;
};

/** 전화·문자 버튼 한 쌍. 번호가 비어 있으면 아무것도 그리지 않는다 */
export function CallButtons({
  name,
  phone,
  className = "flex gap-2",
  buttonClassName = "flex size-9 items-center justify-center rounded-full border border-current/20",
  iconClassName = "size-4",
}: CallButtonsProps) {
  if (!phone) return null;
  return (
    <span className={className}>
      <a href={`tel:${phone}`} aria-label={`${name}에게 전화`} className={buttonClassName}>
        <Icon name="phone" className={iconClassName} />
      </a>
      <a href={`sms:${phone}`} aria-label={`${name}에게 문자`} className={buttonClassName}>
        <Icon name="message" className={iconClassName} />
      </a>
    </span>
  );
}
