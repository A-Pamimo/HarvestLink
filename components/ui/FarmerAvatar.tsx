import Image from 'next/image'
import { cn } from '@/lib/cn'

interface FarmerAvatarProps {
  src: string
  alt?: string
  size?: number
  className?: string
}

export function FarmerAvatar({ src, alt = 'Farmer avatar', size = 80, className }: FarmerAvatarProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full bg-stone-200 ring-4 ring-white shadow-xl',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes={`${size}px`} />
    </div>
  )
}
