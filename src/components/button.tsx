interface ButtonProps {
  text: string
  color: string
  textColor?: string
}
export default function Button({ text, color, textColor }: ButtonProps) {
  return (
    <div className={`flex items-center justify-center bg-${color} h-11 rounded-3xl py-6 pl-8 pr-8 w-max`}>
      <p className={`text-${textColor}`}>{text}</p>
    </div>
  )
}
