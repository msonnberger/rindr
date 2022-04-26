interface HeadingProps {
  title: string
  color?: string
  marginTop?: string
}
export default function Heading({ title, color, marginTop }: HeadingProps) {
  const className = `text-4xl font-bold ${color} ${marginTop}`
  return <h1 className={className}>{title}</h1>
}
