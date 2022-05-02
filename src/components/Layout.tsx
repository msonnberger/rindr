import React from 'react'
import Footer from './Footer'

interface NavElementProps {
  children: React.ReactNode
}

export default function Layout({ children }: NavElementProps) {
  return (
    <div className="flex min-h-screen flex-col p-4">
      <main className="max-h-90v flex w-full flex-1 flex-col overflow-scroll px-3">{children}</main>
    <div className="flex min-h-screen flex-col items-center">
      <main className="flex w-full flex-1 flex-col px-5 mb-24 mt-10 max-w-4xl">{children}</main>
      <Footer />
    </div>
    </div>
  )
}
