// userExams.ts
export interface UserExam {
  id: string;
  userId: string; // Foreign Key to Account
  examId: string; // Foreign Key to Exam
  finishedTime: number; // Time taken by the user to finish the exam
  overallScore: number;
  createdAt?: string;
  updatedAt?: string;
}

export const mockUserExams: UserExam[] = [
  {
    id: "UE1",
    userId: "acc1",
    examId: "exam1",
    finishedTime: 20.4,
    overallScore: 75, // John Doe got 75% on Listening Exam 1
    createdAt: "2024-05-20T10:30:00Z",
    updatedAt: "2024-05-20T10:50:24Z",
  },
  {
    id: "UE2",
    userId: "acc2",
    examId: "exam1",
    finishedTime: 25.0,
    overallScore: 100, // Jane Smith got 100% on Listening Exam 1
    createdAt: "2024-05-21T11:00:00Z",
    updatedAt: "2024-05-21T11:25:00Z",
  },
  {
    id: "UE3",
    userId: "acc1",
    examId: "exam2",
    finishedTime: 15.0,
    overallScore: 80, // John Doe got 80% on Grammar Test
    createdAt: "2024-05-22T09:00:00Z",
    updatedAt: "2024-05-22T09:15:00Z",
  },
  {
    id: "UE4",
    userId: "acc3",
    examId: "exam4",
    finishedTime: 22.0,
    overallScore: 90, // Peter Jones got 90% on Elementary Daily English
    createdAt: "2024-05-23T13:00:00Z",
    updatedAt: "2024-05-23T13:22:00Z",
  },
  {
    id: "UE5",
    userId: "acc4",
    examId: "exam5",
    finishedTime: 55.0,
    overallScore: 85, // Alice Wonder got 85% on Upper-Intermediate Business Case Study
    createdAt: "2024-05-24T16:00:00Z",
    updatedAt: "2024-05-24T16:55:00Z",
  },
];