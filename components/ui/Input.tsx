'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? React.useId()

    return (
      <div className="space-y-1">
        {label ? (
          <label htmlFor={inputId} className="block text-sm font-medium text-stone-700">
            {label}
          </label>
        ) : null}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-brand-text transition-all focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40',
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40' : '',
            className,
          )}
          {...props}
        />
        {hint && !error ? <p className="text-sm text-stone-500">{hint}</p> : null}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
