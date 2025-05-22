import { QuestionListening } from "./Question";

export interface Result {
  id: string;
  title: string;
  finishedTime: number;
  overallScore: number;
  results: QuestionListening[];
}

export const mockResult: Result = {
  id: "123",
  title: "Listening Exam",
  finishedTime: 20.4,
  overallScore: 100,

  results: [
    {
      id: "1",
      question: "What is the capital of France?",
      audio: "https://example.com/audio/france.mp3",
      script:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
      type: {
        id: "C",
        name: "Choose the correct answer",
      },

      options: [
        {
          id: "1",
          symbol: "A",
          description: "Paris",
          // isSelected: true,
          // isCorrect: true,
        },
        {
          id: "2",
          symbol: "B",
          description: "London",
          // isSelected: true,
          // isCorrect: false,
        },
        {
          id: "3",
          symbol: "C",
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
      options: [
        {
          id: "4",
          symbol: "A",
          description: "Seoul",
        },
        {
          id: "5",
          symbol: "B",
          description: "Tokyo",
          isCorrect: false,
          isSelected: true,
        },
        {
          id: "6",
          symbol: "C",
          description: "Bangkok",
        },
      ],
    },
    {
      id: "3",
      question: "What is the capital of Germany?",
      audio: "https://example.com/audio/germany.mp3",
      type: {
        id: "F",
        name: "Fill in the blank",
        answerValue: "Berlin",
        isCorrect: true,
      },
    },
    {
      id: "4",
      question: "What is the capital of Spain?",
      audio: "https://example.com/audio/spain.mp3",
      type: {
        id: "C",
        name: "Choose the correct answer",
      },
      options: [
        {
          id: "7",
          symbol: "A",
          description: "Madrid",
        },
        {
          id: "8",
          symbol: "B",
          description: "Barcelona",
          isCorrect: false,
          isSelected: true,
        },
        {
          id: "9",
          symbol: "C",
          description: "Valencia",
        },
      ],
    },
  ],
};
