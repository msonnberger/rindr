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
      const timeout = setTimeout(() => setShow(true), 500)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <div className="w-16">
      {isActive && (
        <Link href={route} passHref>
          <button
            className={`flex h-10 flex-row items-center justify-between gap-3 rounded-3xl px-3 ${bgColor}`}
          >
            {children}
            {show && (
              <p
                className={`font-sans text-xs font-bold ${fgColor} hidden sm:block animate-slideIn`}
              >
                {title}
              </p>
            )}
          </button>
        </Link>
      )}
      {!isActive && (
        <Link href={route} passHref>
          <button className="px-3">{children}</button>
        </Link>
      )}
    </div>
  )
}
