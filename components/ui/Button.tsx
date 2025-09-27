'use client'

import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700',
  secondary:
    'bg-white text-brand-primary border border-brand-primary hover:bg-emerald-50',
  ghost:
    'bg-transparent text-brand-text hover:bg-white/60 border border-transparent',
  outline:
    'bg-white text-brand-text border-2 border-stone-200 hover:border-brand-primary hover:text-brand-primary',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-4 py-2 rounded-full',
  md: 'text-base px-5 py-2.5 rounded-full',
  lg: 'text-lg px-6 py-3 rounded-full',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant = 'primary', size = 'md', isLoading = false, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.97]',
          'transform-gpu hover:scale-105',
          variantClasses[variant],
          sizeClasses[size],
          isLoading || disabled ? 'opacity-70 cursor-not-allowed hover:scale-100' : '',
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
