import { mockExams } from "../types/Exams";
import { mockUserExamList } from "../types/UserExam";

// const BASE_URL = "/ListeningExam";

export const listeningService = {
  getListeningExam: (id: string) => {
    return mockExams.find((exam) => exam.id === id);
  },

  getSimilarExams: () => {
    return mockExams.slice(0, 4);
  },

  getUserExam: (userId: string) => {
    return mockUserExamList;
  },
};
