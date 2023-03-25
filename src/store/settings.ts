import { create } from "zustand"
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { SETTINGS_STORAGE } from "@/constants/cookies";

type SettingsStore = {
  ttsVoiceCode: string;
  questionsQuantity: number;

  setTTSVoiceCode: (code: string) => void;
  setQuestionsQuantity: (quantity: number) => void;
}

export const useSettings = create<SettingsStore>()(
  immer(persist((set, get) => ({
    ttsVoiceCode: "en_us_001",
    questionsQuantity: 5,
    setTTSVoiceCode: (code) => {
      set((state) => {
        state.ttsVoiceCode = code
      })
    },
    setQuestionsQuantity: (quantity) => {
      set((state) => {
        state.questionsQuantity = quantity
      })
    }
  }), {
    name: SETTINGS_STORAGE
  })),
)