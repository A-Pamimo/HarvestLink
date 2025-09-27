'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface ProductImageProps {
  src: string
  alt?: string
  className?: string
}

export function ProductImage({ src, alt = 'Product image', className }: ProductImageProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className={cn('relative aspect-square overflow-hidden rounded-xl', className)}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 768px) 300px, 45vw" />
    </motion.div>
  )
}
