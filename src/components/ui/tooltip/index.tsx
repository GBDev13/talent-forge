import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { ReactNode } from 'react';

type TooltipProps = {
  children: ReactNode
  content: string | ReactNode;
  className?: string
}

export const Tooltip = ({ children, content, className, ...props }: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider {...props}>
      <TooltipPrimitive.Root delayDuration={300}>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={clsx(
              "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
              "text-neutral-200 text-sm select-none rounded bg-neutral-800 py-2 px-4 shadow-sm will-change-[transform,opacity]",
              className
            )}
            sideOffset={5}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-neutral-800" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}