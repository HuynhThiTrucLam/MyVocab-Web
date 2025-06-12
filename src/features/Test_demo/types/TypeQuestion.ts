// typeQuestions.ts
export interface TypeQuestion {
  id: string;
  name: string;
  createdAt?: string; // Optional, as it might be handled by the backend
}

export const mockTypeQuestions: TypeQuestion[] = [
  { id: "TQ_MC", name: "Choose the correct answer", createdAt: "2023-01-01T10:00:00Z" },
  { id: "TQ_FIB", name: "Fill in the blank", createdAt: "2023-01-01T10:05:00Z" },
  { id: "TQ_TF", name: "True/False", createdAt: "2023-01-01T10:10:00Z" },
  { id: "TQ_MATCH", name: "Matching", createdAt: "2023-01-01T10:15:00Z" }, // Thêm loại câu hỏi mới
];