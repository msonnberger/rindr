import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface NavElementProps {
  title: string
  bgColor: string
  fgColor: string
  route: string
  isActive: boolean
  children: React.ReactNode
}

export default function NavElement({
  title,
  bgColor,
  fgColor,
  route,
  isActive,
  children,
}: NavElementProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => setShow(true), 50)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <Link href={route}>
      <a
        className={`min-w-[3rem] w-fit flex h-10 items-center justify-center gap-3 rounded-3xl px-3 ${
          isActive && bgColor
        }`}
      >
        {children}
        <p
          className={`${
            show ? 'visible' : 'invisible'
          } font-sans text-xs font-bold ${fgColor} hidden sm:block animate-slideIn`}
        >
          {title}
        </p>
      </a>
    </Link>
  )
}
