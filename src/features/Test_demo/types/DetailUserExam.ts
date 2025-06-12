// detailUserExams.ts
export interface DetailUserExam {
  id: string;
  resultId: string; // Foreign Key to UserExam (named ResultId in ERD, likely means UserExam.id)
  answerId?: string; // Foreign Key to Answer (if it's a multiple choice/true-false)
  questionId: string; // Foreign Key to Question
  userAnswerText?: string; // For fill-in-the-blank questions, what the user typed
  isCorrect?: boolean; // Whether the user's answer for this specific question was correct
}

export const mockDetailUserExams: DetailUserExam[] = [
  // Detail for UE1 (John Doe, Exam 1)
  {
    id: "DUE1_Q1",
    resultId: "UE1",
    questionId: "Q1",
    answerId: "A1_1", // User selected Paris (correct)
    isCorrect: true,
  },
  {
    id: "DUE1_Q2",
    resultId: "UE1",
    questionId: "Q2",
    answerId: "A2_3", // User selected Bangkok (incorrect)
    isCorrect: false,
  },
  {
    id: "DUE1_Q3",
    resultId: "UE1",
    questionId: "Q3",
    userAnswerText: "berlin", // User typed "berlin" (correct)
    isCorrect: true,
  },
  {
    id: "DUE1_Q4",
    resultId: "UE1",
    questionId: "Q4",
    answerId: "A4_2", // User selected Barcelona (incorrect)
    isCorrect: false,
  },
  // Detail for UE2 (Jane Smith, Exam 1)
  {
    id: "DUE2_Q1",
    resultId: "UE2",
    questionId: "Q1",
    answerId: "A1_1", // User selected Paris (correct)
    isCorrect: true,
  },
  {
    id: "DUE2_Q2",
    resultId: "UE2",
    questionId: "Q2",
    answerId: "A2_2", // User selected Tokyo (correct)
    isCorrect: true,
  },
  {
    id: "DUE2_Q3",
    resultId: "UE2",
    questionId: "Q3",
    userAnswerText: "Berlin", // User typed "Berlin" (correct)
    isCorrect: true,
  },
  {
    id: "DUE2_Q4",
    resultId: "UE2",
    questionId: "Q4",
    answerId: "A4_1", // User selected Madrid (correct)
    isCorrect: true,
  },
  // Detail for UE3 (John Doe, Exam 2)
  {
    id: "DUE3_Q5",
    resultId: "UE3",
    questionId: "Q5",
    userAnswerText: "sits", // User typed "sits" (correct)
    isCorrect: true,
  },
  {
    id: "DUE3_Q6",
    resultId: "UE3",
    questionId: "Q6",
    answerId: "A6_1", // User selected True (incorrect)
    isCorrect: false,
  },
  // Detail for UE4 (Peter Jones, Exam 4)
  {
    id: "DUE4_Q7",
    resultId: "UE4",
    questionId: "Q7",
    answerId: "A7_1", // User selected correct answer
    isCorrect: true,
  },
  {
    id: "DUE4_Q8",
    resultId: "UE4",
    questionId: "Q8",
    userAnswerText: "My name is Peter", // User typed correct answer
    isCorrect: true,
  },
  // Detail for UE5 (Alice Wonder, Exam 5)
  {
    id: "DUE5_Q9",
    resultId: "UE5",
    questionId: "Q9",
    userAnswerText: "The case study describes a company's challenges in market expansion and proposes strategies for sustainable growth, focusing on digital transformation and customer engagement.",
    isCorrect: true, // Giả định là đúng cho mục đích mock
  },
];