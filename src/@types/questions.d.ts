declare module Questions {
  export type Question = {
    question: string;
    answer: string;
  }

  export type StoredQuestions = {
    id: string;
    title: string;
    questions: Question[];
    createdAt: string;
  }
}