interface ConfirmationButtonProps {
  text: string
  bgColor: string
  textColor?: string
  onClick?: () => void
}
export default function ConfirmationButton({
  text,
  bgColor,
  textColor,
  onClick,
}: ConfirmationButtonProps) {
  return (
    <button
      className={`flex items-center justify-center ${bgColor} rounded-3xl py-1 pl-6 pr-6 w-max font-bold text-sm`}
      onClick={onClick}
    >
      <p className={`${textColor}`}>{text}</p>
    </button>
  )
}
