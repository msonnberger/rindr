interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

function Image({ src, alt, width, height, className }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      // @ts-ignore
      fetchpriority="low"
      loading="lazy"
      decoding="async"
    />
  )
}

export default Image
