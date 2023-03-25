import axios from "axios"

export const generateTTSVoice = async (content: string, voiceCode = "en_us_001") => {
  try {
    const { data } = await axios.post("https://tiktok-tts.weilnet.workers.dev/api/generation", {
      text: content,
      voice: voiceCode
    })
    if (data?.success && data.data) {
      return `data:audio/mpeg;base64,${data.data}`
    }
  } catch {
    return null
  }

  return null
}