import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

export type BaseDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type DialogProps = BaseDialogProps & ComponentProps<typeof DialogPrimitive.Content> & {
  children: ReactNode
  canClose?: boolean
  title?: string
}

export const Dialog = ({ open, onOpenChange, title, canClose = true, children, className, ...props }: DialogProps) => {
  const handleOpenChange = (value: boolean) => {
    if (!canClose && !value) return;
    onOpenChange(value);
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="bg-neutral-900/10 backdrop-blur-lg inset-0 fixed" />
        <DialogPrimitive.Content
        className={clsx("bg-neutral-800 flex focus:outline-none focus:ring-pink-500/40 focus:ring flex-col p-5 rounded-md fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-w-[600px]", className)}
        {...props}
        >
          <div className="mb-4 flex items-center justify-between">
            {title && (
              <DialogPrimitive.Title className="text-2xl font-semibold">
                {title}
              </DialogPrimitive.Title>
            )}

            {canClose && (
              <DialogPrimitive.Close className="ml-auto hover:text-pink-500 transition-all">
                <IoClose size={20} />
              </DialogPrimitive.Close>
            )}
          </div>

          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}