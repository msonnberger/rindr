interface NavElementProps {
    title: string,
    bgColor: string,
    fgColor: string,
    children: any
}

export default function NavElement({ title, bgColor, fgColor, children }: NavElementProps) {
    
  return (
    <div className={bgColor}>
      {children}
      <p className={fgColor}>{title}</p>
    </div>
  )
}