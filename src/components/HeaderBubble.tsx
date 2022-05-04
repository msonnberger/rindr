import Image from 'next/image'

interface HeaderBubbleProps {
  color: string
  text: string
  path: string
  alt: string
}

const HeaderBubble = ({ color, text, path, alt }: HeaderBubbleProps) => {
  return (
    <div
      className={`absolute top-0 -ml-5 w-full max-w-4xl flex justify-center items-center gap-x-6 h-16 rounded-b-2xl ${color} px-8`}
    >
      <Image src={path} alt={alt} width="32" height="32" />
      <p className="text-sm font-semibold">{text}</p>
    </div>
  )
}

export default HeaderBubble
