interface HeadingProps {
    title: string,
    color?: string;
}
export default function Heading({title, color} : HeadingProps) {
  const className = `text-4xl font-bold ${color}`
  return (<h1 className={className}>{title}</h1>)
}
