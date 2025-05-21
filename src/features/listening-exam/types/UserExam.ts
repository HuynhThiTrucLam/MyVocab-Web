import { Exam } from "./Exams";

export interface UserExam {
  exam: Exam;
  status: string;
  score: number;
  created_at: string;
}

export interface UserExamList {
  user_id: string;
  data: UserExam[];
}

export const mockUserExamList: UserExamList = {
  user_id: "1",
  data: [
    {
      exam: {
        id: "1",
        topic: {
          id: "1",
          name: "Geography",
          description: "Geography related questions",
        },
        title: "Capital Cities Quiz",
        description: "Test your knowledge of capital cities around the world.",
        skill: "Listening",
        time: 20,
        created_at: "2021-01-01",
        updated_at: "2021-01-02",
        questions: [
          {
            id: "1",
            question: "What is the capital of France?",
            audio: "https://example.com/audio/france.mp3",
            type: {
              id: "C",
              name: "Choose the correct answer",
            },
            selected_option: [
              {
                id: "1",
                selected_option: "A",
                description: "Paris",
              },
              {
                id: "2",
                selected_option: "B",
                description: "London",
              },
              {
                id: "3",
                selected_option: "C",
                description: "Berlin",
              },
            ],
          },
          {
            id: "2",
            question: "What is the capital of Japan?",
            audio: "https://example.com/audio/japan.mp3",
            type: {
              id: "C",
              name: "Choose the correct answer",
            },
            selected_option: [
              {
                id: "4",
                selected_option: "A",
                description: "Seoul",
              },
              {
                id: "5",
                selected_option: "B",
                description: "Tokyo",
              },
              {
                id: "6",
                selected_option: "C",
                description: "Bangkok",
              },
            ],
          },
        ],
      },
      status: "completed",
      score: 100,
      created_at: "2021-01-01",
    },
    {
      exam: {
        id: "2",
        topic: {
          id: "2",
          name: "Science",
          description: "Basic science questions",
        },
        title: "Basic Science Quiz",
        description: "Test your basic science knowledge.",
        skill: "Listening",
        time: 20,
        created_at: "2021-02-01",
        updated_at: "2021-02-02",
        questions: [
          {
            id: "3",
            question: "What is the chemical symbol for water?",
            audio: "https://example.com/audio/water.mp3",
            type: {
              id: "C",
              name: "Choose the correct answer",
            },

            selected_option: [
              {
                id: "7",
                selected_option: "A",
                description: "H2O",
              },
              {
                id: "8",
                selected_option: "B",
                description: "CO2",
              },
              {
                id: "9",
                selected_option: "C",
                description: "O2",
              },
            ],
          },
          {
            id: "4",
            question: "What planet is known as the Red Planet?",
            audio: "https://example.com/audio/mars.mp3",
            type: {
              id: "C",
              name: "Choose the correct answer",
            },
            selected_option: [
              {
                id: "10",
                selected_option: "A",
                description: "Mars",
              },
              {
                id: "11",
                selected_option: "B",
                description: "Venus",
              },
              {
                id: "12",
                selected_option: "C",
                description: "Jupiter",
              },
            ],
          },
        ],
      },
      status: "completed",
      score: 100,
      created_at: "2021-02-01",
    },
    {
      exam: {
        id: "3",
        topic: { id: "3", name: "Math", description: "Mathematics questions" },
        title: "Simple Math Quiz",
        description: "Test your math skills with simple questions.",
        skill: "Listening",
        time: 20,
        created_at: "2021-03-01",
        updated_at: "2021-03-02",
        questions: [
          {
            id: "5",
            question: "What is 2 + 2?",
            audio: "https://example.com/audio/math.mp3",
            type: {
              id: "F",
              name: "Fill in the blank",
            },
            selected_option: [
              {
                id: "13",
                selected_option: "A",
                description: "3",
              },
              {
                id: "14",
                selected_option: "B",
                description: "4",
              },
              {
                id: "15",
                selected_option: "C",
                description: "5",
              },
            ],
          },
          {
            id: "6",
            question: "What is the square root of 16?",
            audio: "https://example.com/audio/math.mp3",
            type: {
              id: "F",
              name: "Fill in the blank",
            },
            selected_option: [
              {
                id: "16",
                selected_option: "A",
                description: "4",
              },
              {
                id: "17",
                selected_option: "B",
                description: "5",
              },
              {
                id: "18",
                selected_option: "C",
                description: "6",
              },
            ],
          },
        ],
      },
      status: "new",
      score: 0,
      created_at: "2021-03-01",
    },
  ],
};
