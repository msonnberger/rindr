import React from 'react'
import Footer from './footer'

interface NavElementProps {
  children: React.ReactNode
}

export default function Layout({ children }: NavElementProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center p-4">
      <main className="flex w-full flex-1 flex-col px-3">{children}</main>
      <Footer />
    </div>
  )
}
