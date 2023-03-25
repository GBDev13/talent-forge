import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "text"
}

export const Button = ({ children, className, variant = "primary", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all focus:outline-none px-6 rounded py-2 w-max",
        {
          "bg-pink-600 text-neutral-100 enabled:hover:bg-pink-500": variant === "primary",
          "bg-none border border-pink-600 text-pink-600 enabled:hover:bg-pink-600 enabled:hover:text-neutral-100": variant === "outline",
          "text-pink-600 enabled:hover:text-pink-500": variant === "text",
        },
        className
      )}
    >
      {children}
    </button>
  )
}