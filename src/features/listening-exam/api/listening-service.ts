import { Topic } from "./../types/Exams";
import { Exam, mockExams } from "../types/Exams";
import { api } from "@/services/api-client";
import { mockResult, Result } from "../types/Result";
import { mockUserExamList } from "../types/UserExam";
import { Band } from "../types/Bands";

const BASE_URL = import.meta.env.VITE_BE_API_URL;

export const listeningService = {
  getProficiencyList: async () => {
    try {
      const response = await api.get<Band[]>(`${BASE_URL}api/Proficiency`);
      return response.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
      }));
    } catch (error) {
      console.error("Failed to fetch proficiency list:", error);
      throw error;
    }
  },

  getListeningExamListByBandId: async (bandId: string) => {
    try {
      const response = await api.get<Exam[]>(
        `${BASE_URL}api/Exam/${bandId}/exams`
      );
      return response.map((item: any) => ({
        id: item.id,
        topic: {
          id: item.topic,
          name: item.topic,
          description: item.topic,
        },
        title: item.name,
        description: item.topic,
        skill: item.skill,
        time: item.time,
        created_at: item.createdAt,
        updated_at: item.updatedAt,
        questions: item.questions.map((question: any) => ({
          id: question.id,
          question: question.question,
          audio: question.audioUrl,
          script: question.script,
          img: question.imageUrl,
          type: {
            id: question.type.id,
            name: question.type.name,
          },
        })),
      }));
    } catch (error) {
      console.error("Failed to fetch listening exam list by band id:", error);
      throw error;
    }
  },

  getListeningExamById: async (examId: string) => {
    try {
      const response = await api.get<any>(`${BASE_URL}api/Exam/${examId}`);
      console.log("response", response);
      return {
        id: response.id,
        title: response.name,
        description: response.proficiency.band, // or response.description if available
        topic: {
          id: response.topic,
          name: response.topic,
          description: response.topic,
        },
        skill: response.skill,
        time: response.time,
        created_at: response.createdAt,
        updated_at: response.updatedAt,
        questions: response.questions?.map((question: any) => ({
          id: question.id,
          question: question.question,
          audio: question.audioUrl,
          script: question.script,
          img: question.imageUrl,
          type: {
            id: question.type.id,
            name: question.type.name,
          },
          options: question.options?.map((option: any) => ({
            id: option.id,
            symbol: option.symbol,
            description: option.description,
          })),
        })),
      };
    } catch (error) {
      console.error("Failed to fetch listening exam:", error);
      throw error;
    }
  },

  getSimilarExams: () => {
    return mockExams.slice(0, 4);
  },

  getUserExam: (userId: string) => {
    console.log("userId", userId);
    return mockUserExamList;
  },

  getResult: (resultId: string) => {
    console.log("resultId", resultId);
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
