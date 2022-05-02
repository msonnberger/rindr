interface ButtonProps {
  text: string
  bgColor: string
  textColor?: string
  onClick?: () => void
  buttonType: 'submit' | 'reset' | 'button'
}
export default function Button({ text, bgColor, textColor, onClick, buttonType }: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center ${bgColor} h-11 w-max rounded-3xl py-6 pl-8 pr-8`}
      onClick={onClick}
      type={buttonType}
    >
      <p className={`${textColor}`}>{text}</p>
    </button>
  )
}
