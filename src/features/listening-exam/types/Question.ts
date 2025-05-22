export interface QuestionListening {
  id: string;
  question: string;
  audio: string;
  script?: string;
  img?: string;
  type: {
    id: string;
    name: string;
    answerValue?: string; // for fill in the blank question
    correctValue?: string;
    isCorrect?: boolean; // for choose the correct answer question
  };
  options?: SelectedOption[];
  isEmpty?: boolean;
}

export interface SelectedOption {
  id: string;
  symbol: string;
  description: string;
  isSelected?: boolean;
  isCorrect?: boolean;
}
