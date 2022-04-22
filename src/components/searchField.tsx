import React from 'react'

interface SearchFieldProps {
  children: React.ReactNode
  size?: string
}

export default function SearchField({ children, size }: SearchFieldProps) {
  return <div className={`flex ${size} h-14 max-w-md flex-row rounded-3xl bg-sky-50 p-4 items-center`}>{children}</div>
}
