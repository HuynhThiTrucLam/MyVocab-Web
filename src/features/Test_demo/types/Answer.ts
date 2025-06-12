// answers.ts
export interface Answer {
  id: string;
  symbol: string;
  description: string;
  isCorrect: boolean;
  questionId: string; // Foreign Key to Question
}

export const mockAnswers: Answer[] = [
  // Answers for Q1 (France)
  { id: "A1_1", symbol: "A", description: "Paris", isCorrect: true, questionId: "Q1" },
  { id: "A1_2", symbol: "B", description: "London", isCorrect: false, questionId: "Q1" },
  { id: "A1_3", symbol: "C", description: "Berlin", isCorrect: false, questionId: "Q1" },
  // Answers for Q2 (Japan)
  { id: "A2_1", symbol: "A", description: "Seoul", isCorrect: false, questionId: "Q2" },
  { id: "A2_2", symbol: "B", description: "Tokyo", isCorrect: true, questionId: "Q2" },
  { id: "A2_3", symbol: "C", description: "Bangkok", isCorrect: false, questionId: "Q2" },
  // Answers for Q4 (Spain)
  { id: "A4_1", symbol: "A", description: "Madrid", isCorrect: true, questionId: "Q4" },
  { id: "A4_2", symbol: "B", description: "Barcelona", isCorrect: false, questionId: "Q4" },
  { id: "A4_3", symbol: "C", description: "Valencia", isCorrect: false, questionId: "Q4" },
  // Answers for Q6 (True/False Grammar)
  { id: "A6_1", symbol: "T", description: "True", isCorrect: false, questionId: "Q6" },
  { id: "A6_2", symbol: "F", description: "False", isCorrect: true, questionId: "Q6" },
  // Answers for Q7 (Elementary Daily English)
  { id: "A7_1", symbol: "A", description: "I'm fine, thank you.", isCorrect: true, questionId: "Q7" },
  { id: "A7_2", symbol: "B", description: "I fine am, thank you.", isCorrect: false, questionId: "Q7" },
];