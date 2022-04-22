interface ButtonProps {
  text: string
  bgColor: string
  textColor?: string
  onClick?: () => void
}
export default function Button({ text, bgColor, textColor, onClick }: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center ${bgColor} h-11 rounded-3xl py-6 pl-8 pr-8 w-max`}
      onClick={onClick}
    >
      <p className={`${textColor}`}>{text}</p>
    </button>
  )
}
