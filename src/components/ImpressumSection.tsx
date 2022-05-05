import React from 'react'

interface ImpressumSectionProps {
  header: string
  children: React.ReactNode
}

export default function ImpressumSection({ header, children }: ImpressumSectionProps) {
  return (
    <section id={header}>
      <h3 className="mb-2 mt-6 text-left font-bold">{header}</h3>
      <p className="text-justify">{children}</p>
    </section>
  )
}
