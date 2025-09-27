import Image from 'next/image'
import { cn } from '@/lib/cn'

interface HeroImageProps {
  src: string
  alt?: string
  overlay?: boolean
  className?: string
}

export function HeroImage({ src, alt = 'Farm landscape', overlay = true, className }: HeroImageProps) {
  return (
    <div className={cn('relative h-full w-full overflow-hidden rounded-3xl', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      )}
    </div>
  )
}
