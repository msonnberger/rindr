import { Rose } from '../styles/colors'
import { getRandomInt } from '../utils/functions'

interface TagProps {
  text: string
  className?: string
}

export default function Tag({ text, className }: TagProps) {
  const randomColor = () => {
    const random = getRandomInt(1, 9) * 100
    const textColor = random < 500 ? Rose[900] : Rose[50]
    // @ts-ignore
    return { bgColor: Rose[random], textColor: textColor }
  }
  const { bgColor, textColor } = randomColor()

  return (
    <div
      className={`group relative flex gap-4 rounded-full bg-slate-100 ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <p className="text-white">{text}</p>
    </div>
  )
}
