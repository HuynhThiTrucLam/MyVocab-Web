import { mockExams } from "../types/Exams";
import { mockResult, Result } from "../types/Result";
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

  getResult: (resultId: string) => {
    return mockResult;
  },

  countCorrectAnswers: (result: Result | null) => {
    let correctCount = 0;

    for (const question of result?.results ?? []) {
      if (question.options && question.options.length > 0) {
        // For multiple choice questions, count the number of options marked as correct
        correctCount += question.options.filter(
          (opt) => opt.isCorrect === true
        ).length;
      } else if (question.type && question.type.isCorrect === true) {
        // For other question types (like fill-in-the-blank), count as 1 if isCorrect is true
        correctCount += 1;
      }
    }

    return correctCount;
  },

  countIncorrectAnswers: (result: Result) => {
    let incorrectCount = 0;

    for (const question of result.results) {
      if (question.options && question.options.length > 0) {
        incorrectCount += question.options.filter(
          (opt) => opt.isCorrect === false
        ).length;
      } else if (question.type && question.type.isCorrect === false) {
        incorrectCount += 1;
      }
    }

    return incorrectCount;
  },
};
