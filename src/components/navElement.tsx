import Link from 'next/link'
import React from 'react'

interface NavElementProps {
  title: string
  bgColor: string
  fgColor: string
  route: string
  isActive: boolean
  children: React.ReactNode
}

export default function NavElement({ title, bgColor, fgColor, route, isActive, children }: NavElementProps) {
  return (
    <>
      {isActive && (
        <Link href={route} passHref>
          <button className={`flex h-10 flex-row items-center justify-between gap-4 rounded-3xl px-3 ${bgColor}`}>
            {children}
            <p className={`mr-3 font-sans text-xs font-bold ${fgColor}`}>{title}</p>
          </button>
        </Link>
      )}
      {!isActive && (
        <Link href={route} passHref>
          <button>{children}</button>
        </Link>
      )}
    </>
  )
}
