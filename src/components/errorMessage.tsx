import React from 'react'
import Heading from './heading'

interface ErrorMessageProps {
  headline: string
  text: string
  colors: string
  children?: React.ReactNode
}
export default function ErrorMessage({ headline, text, colors, children }: ErrorMessageProps) {
  return (
    <div className={`flex flex-col bg-${colors}-100 rounded-3xl p-8`}>
      <Heading title={headline} color={`text-${colors}-500`} />
      <p className="font-light">{text}</p>
      <div className="flex flex-row w-full items-center justify-center mt-10 gap-4">{children}</div>
    </div>
  )
}
