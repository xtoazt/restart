import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
                default:
                  'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-[1.02]',
        destructive:
          'bg-gradient-to-r from-destructive to-destructive/80 text-white shadow-lg hover:from-destructive/90 hover:to-destructive/70 hover:shadow-xl hover:scale-[1.02]',
        outline:
          'border border-primary/20 bg-background/50 backdrop-blur-sm shadow-sm hover:bg-accent/50 hover:border-primary/30 hover:shadow-md',
        secondary:
          'bg-accent/50 text-primary shadow-sm hover:bg-accent/70 hover:shadow-md',
        ghost: 'hover:bg-accent/50 hover:text-primary',
        link: 'text-brand underline-offset-4 hover:underline hover:text-brand/80'
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 rounded-lg px-4 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
