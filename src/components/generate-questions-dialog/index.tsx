import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ReactNode, useEffect } from 'react';
import { Input } from '../ui/input';
import { BsArrowRightShort } from 'react-icons/bs'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/lib/axios';
import { parseCookies } from 'nookies';
import { API_KEY_COOKIE } from '@/constants/cookies';
import { useQuestions } from '@/store/questions';
import { Button } from '../ui/button';
import { Dialog } from '../ui/dialog';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useSettings } from '@/store/settings';

type GenerateQuestionsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children?: ReactNode
}

const generateQuestionsFormSchema = z.object({
  position: z.string().nonempty(),
  skills: z.string().optional(),
})

type GenerateQuestionsFormData = z.infer<typeof generateQuestionsFormSchema>

export const GenerateQuestionsDialog = ({ open, onOpenChange }: GenerateQuestionsDialogProps) => {
  const { handleSubmit, control, formState: { isSubmitting }, reset } = useForm<GenerateQuestionsFormData>({
    resolver: zodResolver(generateQuestionsFormSchema),
    defaultValues: {
      position: '',
      skills: '',
    }
  })

  const { setCurrentQuestions, setCurrentQuestionIndex } = useQuestions();
  const { questionsQuantity } = useSettings();

  const onSubmit = async (data: GenerateQuestionsFormData) => {
    try {
      const cookies = parseCookies();
      const encryptedApiKey = cookies[API_KEY_COOKIE]

      if(!encryptedApiKey) {
        toast.error("Please, update your API key on the settings.")
        return
      }

      const response = await api.post("/generate-questions", {
        position: data.position,
        skills: data.skills,
        quantity: questionsQuantity,
        encryptedApiKey
      })

      if (response.data?.error) {
        toast.error("Something went wrong. Please, try again later.")
        return
      }

      setCurrentQuestions(response.data.questions);
      setCurrentQuestionIndex(0)
      onOpenChange(false);
      toast.success("Questions generated successfully!")
    } catch (error) {
      const status = (error as AxiosError)?.response?.status;
      if(status === 401) {
        toast.error("Please, update your API key on the settings.")
        return
      }
      toast.error("Something went wrong. Please, try again later.")
    }
  }

  useEffect(() => {
    reset()
  }, [open, reset])

  return (
    <Dialog open={open} title="Generate Questions" onOpenChange={onOpenChange}>
      <DialogPrimitive.Description className="font-light text-neutral-400 text-sm sm:text-base">
        {"To help us tailor your interview training, please let us know what position you're applying for and what skills are required for the job. This information will help us provide you with targeted training on the specific skills and attributes the job requires."}
      </DialogPrimitive.Description>

      <form className="flex flex-col w-full gap-4 mt-6" onSubmit={handleSubmit(onSubmit)}>

        <Controller
          control={control}
          name="position"
          render={({ field, fieldState }) => (
            <Input placeholder="Position" {...field} error={fieldState?.error} />
          )}
        />
        <Controller
          control={control}
          name="skills"
          render={({ field, fieldState }) => (
            <Input placeholder="Skills separated by commas (Optional)" {...field} error={fieldState?.error} />
          )}
        />

        <div className="ml-auto flex gap-2">
          <Button disabled={isSubmitting}>
            Generate
            <BsArrowRightShort size={25} />
          </Button>
        </div>
      </form>
    </Dialog>
  )
}