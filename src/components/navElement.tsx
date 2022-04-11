import { useRouter } from 'next/router'

interface NavElementProps {
  title: string
  bgColor: string
  fgColor: string
  route: string
  isActive: boolean
  children: React.ReactNode
}

export default function NavElement({ title, bgColor, fgColor, route, isActive, children }: NavElementProps) {
  const router = useRouter()
  const handleClick = () => {
    router.push(route)
  }

  return (
    <>
      {isActive && (
        <button
          className={`flex h-10 flex-row items-center justify-between gap-4 rounded-3xl px-3 ${bgColor}`}
          onClick={handleClick}
        >
          {children}
          <p className={`mr-3 font-sans text-xs font-bold ${fgColor}`}>{title}</p>
        </button>
      )}
      {!isActive && <button onClick={handleClick}>{children}</button>}
    </>
  )
}