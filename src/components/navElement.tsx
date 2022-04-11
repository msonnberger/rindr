import { useRouter } from 'next/router'

interface NavElementProps {
    title: string,
    bgColor: string,
    fgColor: string,
    route: string,
    isActive: boolean,
    children: React.ReactNode
}


export default function NavElement({ title, bgColor, fgColor, route, isActive, children }: NavElementProps) {
  const router = useRouter()
  const handleClick = () => {
    router.push(route)
  }  

  return (
      <>
      {isActive &&
        <button className={bgColor} onClick={()=>handleClick()}>
            {children}
            <p className={fgColor}>{title}</p>
        </button>}
       {!isActive &&
        <button onClick={()=>handleClick()}>
            {children}
        </button>
    }
    </>
  )
}