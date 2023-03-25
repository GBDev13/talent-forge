import { useQuestions } from '@/store/questions';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Popover from '@radix-ui/react-popover';
import { ReactNode, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type SaveCurrentQuestionsPopoverProps = {
  children: ReactNode
}

const saveCurrentQuestionsPopoverSchema = z.object({
  title: z.string().nonempty()
})

type SaveCurrentQuestionsPopoverData = z.infer<typeof saveCurrentQuestionsPopoverSchema>

export const SaveCurrentQuestionsPopover = ({ children }: SaveCurrentQuestionsPopoverProps) => {
  const [open, setOpen] = useState(false)

  const { handleSubmit, control, reset } = useForm<SaveCurrentQuestionsPopoverData>({
    resolver: zodResolver(saveCurrentQuestionsPopoverSchema),
    defaultValues: {
      title: ''
    }
  });

  const { storeCurrentQuestions } = useQuestions();

  const onSubmit = (data: SaveCurrentQuestionsPopoverData) => {
    storeCurrentQuestions(data.title)
    setOpen(false)
    toast.success("Questions saved successfully!")
  }

  useEffect(() => {
    reset()
  }, [open, reset])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content sideOffset={5} className="bg-neutral-800 p-4 rounded text-neutral-100 min-w-[300px]">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <h3 className='text-sm text-center text-neutral-300'>
              Please enter a title
            </h3>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  placeholder="Title"
                  {...field}
                  error={fieldState?.error}
                />
              )}
            />
            <Button type="submit" className="!py-1.5 !w-full mt-1">
              Save
            </Button>
          </form>
          <Popover.Arrow className="fill-neutral-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}