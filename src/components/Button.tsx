interface ButtonProps {
  text: string
  bgColor: string
  textColor?: string
  onClick?: () => void
  buttonType: 'submit' | 'reset' | 'button'
  fontWeight?: string
}
export default function Button({
  text,
  bgColor,
  textColor,
  onClick,
  buttonType,
  fontWeight,
}: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center ${bgColor} font-${fontWeight}  h-11 w-max rounded-3xl py-3 pl-8 pr-8`}
      onClick={onClick}
      type={buttonType}
    >
      <p className={`${textColor}`}>{text}</p>
    </button>
  )
}
