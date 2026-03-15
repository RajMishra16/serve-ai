import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `
  group/button inline-flex shrink-0 items-center justify-center
  rounded-lg border border-transparent bg-clip-padding
  text-sm font-medium whitespace-nowrap
  transition-all duration-200 ease-out
  select-none outline-none
  hover:scale-[1.02] active:scale-[0.98]
  focus-visible:ring-3 focus-visible:ring-ring/40
  disabled:pointer-events-none disabled:opacity-50
  [&_svg]:pointer-events-none [&_svg]:shrink-0
  [&_svg:not([class*='size-'])]:size-4
  `,
  {
    variants: {

      variant: {

        default:
          `
          bg-emerald-600 text-white
          hover:bg-emerald-700
          shadow-sm hover:shadow-md
          `,

        outline:
          `
          border border-gray-200
          bg-white
          text-gray-800
          hover:bg-gray-100
          `,

        secondary:
          `
          bg-gray-100
          text-gray-900
          hover:bg-gray-200
          `,

        ghost:
          `
          bg-transparent
          hover:bg-gray-100
          text-gray-700
          `,

        destructive:
          `
          bg-red-500 text-white
          hover:bg-red-600
          shadow-sm
          `,

        link:
          `
          text-emerald-600 underline-offset-4
          hover:underline
          `,
      },

      size: {

        default: "h-9 px-4 gap-2",

        xs: "h-6 px-2 text-xs gap-1",

        sm: "h-8 px-3 text-sm gap-1.5",

        lg: "h-11 px-6 text-base gap-2",

        icon: "h-9 w-9",

        "icon-xs": "h-6 w-6",

        "icon-sm": "h-8 w-8",

        "icon-lg": "h-11 w-11",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {

  const Comp = asChild ? Slot.Root : "button"

  return (

    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />

  )

}

export { Button, buttonVariants }