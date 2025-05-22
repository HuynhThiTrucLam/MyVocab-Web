export interface QuestionListening {
  id: string;
  question: string;
  audio: string;
  img?: string;
  type: {
    id: string;
    name: string;
  };
  options?: SelectedOption[];
}

export interface SelectedOption {
  id: string;
  symbol: string;
  description: string;
  isSelected?: boolean;
}
