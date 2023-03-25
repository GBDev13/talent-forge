import clsx from "clsx"
import { InputHTMLAttributes, useState } from "react"
import { FieldError } from "react-hook-form"
import { BsEye, BsEyeSlash } from "react-icons/bs"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError
}

export const Input = ({ error, type, ...props }: InputProps) => {
  const [showValue, setShowValue] = useState(false)

  const inputType = type === "password" && !showValue ? "password" : "text"

  return (
    <div className="grid">
      <div
        className={clsx(
          "bg-neutral-700 flex rounded border border-neutral-500/50 focus-within::border-pink-600 text-neutral-200 transition-colors",
          {
            "!border-red-400": error,
          }
        )}
      >
        <input
          className="placeholder:text-neutral-500 h-10 flex-1 pl-4 bg-transparent border-none focus:outline-none"
          type={inputType}
          {...props}
        />

        {type === "password" && (
          <button type="button" className="px-4 text-lg hover:text-pink-500 transition-all" onClick={() => setShowValue(old => !old)}>
            {!showValue ? (
              <BsEye />
            ) : (
              <BsEyeSlash />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-2">{error?.message}</p>
      )}
    </div>
  )
}