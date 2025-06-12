// questions.ts
import { TypeQuestion } from "./TypeQuestion"; // Import TypeQuestion if needed for full object, or just use string for ID

export interface QuestionOption {
  id: string;
  symbol: string;
  description: string;
  isCorrect?: boolean; // Indicates if this is the correct answer
  isSelected?: boolean; // Indicates if this option was selected by the user
}

export interface Question {
  id: string;
  content: string; // Renamed from 'question' for consistency with ERD 'Content'
  examId: string; // Foreign Key to Exam
  typeQuestionId: string; // Foreign Key to TypeQuestion
  audio?: string; // Specific to listening questions
  script?: string; // Specific to listening questions
  options?: QuestionOption[]; // For multiple-choice questions
  answerValue?: string; // For fill-in-the-blank questions (the correct answer)
}

export const mockQuestions: Question[] = [
  // Questions for Exam 1 (Listening Exam 1)
  {
    id: "Q1",
    content: "What is the capital of France?",
    examId: "exam1",
    typeQuestionId: "TQ_MC",
    audio: "https://example.com/audio/france.mp3",
    script: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: "Q2",
    content: "What is the capital of Japan?",
    examId: "exam1",
    typeQuestionId: "TQ_MC",
    audio: "https://example.com/audio/japan.mp3",
  },
  {
    id: "Q3",
    content: "What is the capital of Germany?",
    examId: "exam1",
    typeQuestionId: "TQ_FIB",
    audio: "https://example.com/audio/germany.mp3",
    answerValue: "Berlin", // The correct answer for FIB
  },
  {
    id: "Q4",
    content: "What is the capital of Spain?",
    examId: "exam1",
    typeQuestionId: "TQ_MC",
    audio: "https://example.com/audio/spain.mp3",
  },
  // Questions for Exam 2 (Grammar Test - Beginner)
  {
    id: "Q5",
    content: "The cat ___ on the mat. (sit)",
    examId: "exam2",
    typeQuestionId: "TQ_FIB",
    answerValue: "sits",
  },
  {
    id: "Q6",
    content: "True or False: 'I am go to school' is grammatically correct.",
    examId: "exam2",
    typeQuestionId: "TQ_TF",
  },
  // New questions for Exam 4 (Elementary Daily English)
  {
    id: "Q7",
    content: "Hi, how are you?",
    examId: "exam4",
    typeQuestionId: "TQ_MC",
    options: [
      { id: "A7_1", symbol: "A", description: "I'm fine, thank you.", isCorrect: true },
      { id: "A7_2", symbol: "B", description: "I fine am, thank you.", isCorrect: false },
    ],
  },
  {
    id: "Q8",
    content: "What's your name?",
    examId: "exam4",
    typeQuestionId: "TQ_FIB",
    answerValue: "My name is",
  },
  // New questions for Exam 5 (Upper-Intermediate Business Case Study)
  {
    id: "Q9",
    content: "Write a summary of the provided business case.",
    examId: "exam5",
    typeQuestionId: "TQ_FIB", // Sử dụng FIB cho một câu trả lời dạng văn bản dài
    // Trong thực tế, loại câu hỏi này sẽ cần một cách xử lý khác (ví dụ: đánh giá thủ công)
    answerValue: "A concise summary of the business case.",
  },
];