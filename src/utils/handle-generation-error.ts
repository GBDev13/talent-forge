import { AxiosError } from "axios";
import { toast } from "sonner";

export const handleGenerationError = (error: any) => {
  const axiosError = (error as AxiosError);

  const status = axiosError?.response?.status;
  switch (status) {
    case 401:
      toast.error("Please, update your API key on the settings.")
      return
    case 429:
      toast.error("Oops! Looks like you've reached the usage limit for the OpenAI API. Please take a moment to recharge and try again later.");
      return
    default:
      toast.error("Something went wrong. Please, try again later.")
      return
  }
}