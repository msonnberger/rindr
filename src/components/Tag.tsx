import { getRandomColor } from '../utils/functions'

interface TagProps {
  text: string
  className?: string
}

export default function Tag({ text, className }: TagProps) {
  const { bgColor, textColor } = getRandomColor(900, 50, 500)

  return (
    <div
      className={`group relative flex gap-4 rounded-full bg-slate-100 ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <p className="text-white">{text}</p>
    </div>
  )
}
