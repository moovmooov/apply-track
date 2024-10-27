import type { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"

type VariantProps = Record<string, string>
type VariantKeyProps = keyof typeof variants
type ButtonTrackerProps = ComponentPropsWithRef<"button"> & {
  variant: VariantKeyProps
}

const variants = {
  default: "artdeco-button--primary",
  disabled: "opacity-50 cursor-not-allowed",
  loading: "bg-[#f5f5f5] cursor-not-allowed",
  added: "artdeco-button--secondary",
  error: "bg-[#f8d7da]"
} satisfies VariantProps

const ButtonTracker = ({
  children,
  variant,
  onClick,
  disabled
}: ButtonTrackerProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        variants[variant],
        "jobs-apply-button artdeco-button artdeco-button--3 ember-view"
      )}>
      {children}
    </button>
  )
}

export default ButtonTracker
