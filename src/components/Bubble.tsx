import Image from 'next/image'
import React from 'react'

interface BubbleProps {
  color: string
  text: string
  path: string
  alt: string
}

const Bubble = ({ color, text, path, alt }: BubbleProps) => {
  return (
    <div
      className={`absolute top-0 -ml-5 w-full max-w-4xl flex items-center gap-x-6 h-16 rounded-b-2xl ${color} px-8`}
    >
      <Image src={path} alt={alt} width="32" height="32" className="basis-1/3" />
      <p className="basis-2/3 text-sm font-semibold">{text}</p>
    </div>
  )
}

export default Bubble
