interface ConfirmationButtonProps {
  text: string
  bgColor: string
  textColor?: string
  onClick?: () => void
  disabled?: boolean
}
export default function ConfirmationButton({
  text,
  bgColor,
  textColor,
  onClick,
  disabled,
}: ConfirmationButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`flex items-center justify-center ${bgColor} ${textColor} rounded-3xl py-1 pl-6 pr-6 w-max font-bold text-sm`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
