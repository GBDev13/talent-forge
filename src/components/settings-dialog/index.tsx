import { API_KEY_COOKIE } from '@/constants/cookies';
import { TTS_VOICES } from '@/constants/tts-voices';
import { useSettings } from '@/store/settings';
import { decryptApiKey, encryptApiKey } from '@/utils/encrypt';
import { generateTTSVoice } from '@/utils/generate-tts-voice';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies, setCookie } from 'nookies';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsQuestionCircle } from 'react-icons/bs';
import { z } from 'zod';
import { Button } from '../ui/button';
import { BaseDialogProps, Dialog } from "../ui/dialog"
import { Input } from '../ui/input';
import { Select } from '../ui/Select';
import { Tooltip } from '../ui/tooltip';

type SettingsDialogProps = BaseDialogProps

const settingsFormSchema = z.object({
  apiKey: z.string().nonempty(),
  ttsVoiceCode: z.string().nonempty(),
  questionsQuantity: z.coerce.number().int().min(1).max(20)
});

type SettingsFormData = z.infer<typeof settingsFormSchema>

export const SettingsDialog = ({ ...props }: SettingsDialogProps) => {
  const { setTTSVoiceCode, setQuestionsQuantity } = useSettings();

  const { handleSubmit, control, setValue } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      apiKey: '',
      ttsVoiceCode: ''
    }
  });

  useEffect(() => {
    const cookies = parseCookies();
    const apiKey = cookies[API_KEY_COOKIE];

    if (apiKey) {
      setValue("apiKey", decryptApiKey(apiKey));
    }

    const { ttsVoiceCode, questionsQuantity } = useSettings.getState()
    if (ttsVoiceCode) {
      setValue("ttsVoiceCode", ttsVoiceCode);
    }

    if (questionsQuantity) {
      setValue("questionsQuantity", questionsQuantity);
    }
  }, [setValue, props.open])

  const onSubmit = (data: SettingsFormData) => {
    const encryptedApiKey = encryptApiKey(data.apiKey);
    setCookie(null, API_KEY_COOKIE, encryptedApiKey);
    setTTSVoiceCode(data.ttsVoiceCode);
    setQuestionsQuantity(Number(data.questionsQuantity))
    props.onOpenChange(false);
  }

  const previewVoice = async (code: string) => {
    const base64 = await generateTTSVoice("This is a test voice", code);
    if (!base64) return;
    const audio = new Audio(base64);
    audio.play();
  }

  return (
    <Dialog {...props} title="Settings" className="w-full max-w-[350px]">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="font-semibold text-sm text-neutral-500 block mb-1">
            API Key
          </label>
          <Controller
            name="apiKey"
            control={control}
            render={({ field, fieldState }) => (
              <Input type="password" {...field} error={fieldState?.error} />
            )}
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-sm text-neutral-500 block mb-1">
              Voice Preset
            </label>
            <Controller
              name="ttsVoiceCode"
              control={control}
              render={({ field }) => (
                <Select
                  options={TTS_VOICES}
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    previewVoice(value);
                  }}
                />
              )}
            />
          </div>
          <div>
            <label className="font-semibold text-sm text-neutral-500 mb-1 flex items-center gap-2">
              Questions Quantity
              <Tooltip content={<span className="block max-w-[300px] text-xs text-neutral-300">
              Each generated interview question and answer has a limit of 100 tokens (100-150 characters) and there is a limit of 20 questions per request, meaning that the total number of tokens generated per request will not exceed 2,000. To avoid exceeding the limit, we recommend generating around 5 questions per request.
              </span>}>
                <div className="hover:text-pink-500 transition-colors">
                  <BsQuestionCircle size={15} />
                </div>
              </Tooltip>
            </label>
            <Controller
              name="questionsQuantity"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  type="number"
                  step={1}
                  {...field}
                  error={fieldState?.error}
                />
              )}
            />
          </div>
        </div>


        <Button className="!w-full mt-2">
          Save
        </Button>
      </form>
    </Dialog>
  )
}