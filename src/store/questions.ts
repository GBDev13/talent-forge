import { create } from "zustand"
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { QUESTIONS_STORAGE } from "@/constants/cookies";
import { v4 as uuid } from "uuid";

type QuestionsStore = {
  currentQuestions: Questions.StoredQuestions;
  storedQuestions: Questions.StoredQuestions[];
  currentQuestionIndex: number;

  setCurrentQuestions: (questions: Questions.Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  storeCurrentQuestions: (title: string) => void;
  applyStoredQuestions: (questions: Questions.StoredQuestions) => void;
  deleteStoredQuestionsById: (id: string) => void;
}

export const useQuestions = create<QuestionsStore>()(
  immer(persist((set, get) => ({
    currentQuestions: {
      questions: [] as Questions.Question[]
    } as Questions.StoredQuestions,
    storedQuestions: [],
    currentQuestionIndex: 0,
    setCurrentQuestions: (questions) => {
      set((state) => {
        state.currentQuestions = {
          questions
        } as Questions.StoredQuestions
      })
    },
    setCurrentQuestionIndex: (index) => {
      set((state) => {
        state.currentQuestionIndex = index
      })
    },
    storeCurrentQuestions: (title) => {
      set((state) => {
        const data = {
          id: uuid(),
          title,
          questions: state.currentQuestions.questions,
          createdAt: new Date().toISOString()
        };
        state.storedQuestions.push(data)
        state.currentQuestions = data
      })
    },
    applyStoredQuestions: (questions: Questions.StoredQuestions) => {
      set((state) => {
        state.currentQuestionIndex = 0
        state.currentQuestions = questions
      })
    },
    deleteStoredQuestionsById: (id: string) => {
      set((state) => {
        if(state.currentQuestions.id === id) {
          state.currentQuestions = {
            questions: [] as Questions.Question[]
          } as Questions.StoredQuestions
        }
        state.storedQuestions = state.storedQuestions.filter(q => q.id !== id)
      })
    }
  }), {
    name: QUESTIONS_STORAGE
  })),
)