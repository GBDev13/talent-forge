import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Input } from '../ui/input';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/lib/axios';
import { encryptApiKey } from '@/utils/encrypt';
import { setCookie } from 'nookies';
import { API_KEY_COOKIE } from '@/constants/cookies';
import { useQuestions } from '@/store/questions';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useSettings } from '@/store/settings';

type StartDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const startFormSchema = z.object({
  position: z.string().nonempty(),
  skills: z.string().optional(),
  apiKey: z.string().nonempty()
})

type StartFormData = z.infer<typeof startFormSchema>

export const StartDialog = ({ open, onOpenChange }: StartDialogProps) => {
  const [step, setStep] = useState(1)

  const { handleSubmit, control, watch, formState: { isSubmitting } } = useForm<StartFormData>({
    resolver: zodResolver(startFormSchema),
    defaultValues: {
      position: '',
      skills: '',
      apiKey: ''
    }
  })

  const isDisabled = !watch("position") || isSubmitting;

  const { setCurrentQuestions } = useQuestions();
  const { questionsQuantity } = useSettings();

  const onSubmit = async (data: StartFormData) => {
    try {
      const encryptedApiKey = encryptApiKey(data.apiKey);

      const response = await api.post("/generate-questions", {
        position: data.position,
        skills: data.skills,
        quantity: questionsQuantity,
        encryptedApiKey
      })

      setCookie(null, API_KEY_COOKIE, encryptedApiKey);

      if (response.data?.error) {
        toast.error("Something went wrong. Please, try again later.")
        return
      }

      setCurrentQuestions(response.data.questions);
      onOpenChange(false);
      toast.success("Questions generated successfully!")
    } catch (error) {
      const status = (error as AxiosError)?.response?.status;
      if (status === 401) {
        toast.error("Please, update your API key on the settings.")
        return
      }
      toast.error("Something went wrong. Please, try again later.")
    }
  }

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2)
      return;
    }
    handleSubmit(onSubmit)()
  }

  const handlePrevStep = () => {
    setStep(state => state - 1)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={"Let's get to know you!"} canClose={false}>
      <DialogPrimitive.Description className="font-light text-neutral-400 text-sm sm:text-base">
        {step === 1 ?
          "To help us tailor your interview training, please let us know what position you're applying for and what skills are required for the job. This information will help us provide you with targeted training on the specific skills and attributes the job requires." :
          "In addition, to generate questions, we will be using the OpenAI API. We understand the importance of keeping your data secure and confidential, and we want to assure you that your API key will be encrypted and stored only in your browser's cookies. We will not store it anywhere else."
        }
      </DialogPrimitive.Description>

      <form className="flex flex-col w-full gap-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
        {step === 1 ? (
          <>
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
          </>
        ) : (
          <Controller
            control={control}
            name="apiKey"
            render={({ field, fieldState }) => (
              <Input placeholder="API Key" type="password" {...field} error={fieldState?.error} />
            )}
          />
        )}

        <div className="ml-auto flex gap-2">
          {step === 2 && (
            <Button variant="outline" type="button" onClick={handlePrevStep} disabled={isSubmitting} className="gap-2 pl-4">
              <BsArrowLeftShort size={25} />
              Back
            </Button>
          )}
          <Button type="button" disabled={isDisabled} onClick={handleNextStep} className="pr-4 gap-2">
            Next
            <BsArrowRightShort size={25} />
          </Button>
        </div>
      </form>
    </Dialog>
  )
}