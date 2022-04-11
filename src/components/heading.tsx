interface HeadingProps {
    title: string,
    color?: string;
}
export default function Heading({title} : HeadingProps) {
  return <h1 className="text-4xl font-bold">{title}</h1>
}
