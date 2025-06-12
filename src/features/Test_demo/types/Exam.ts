// src/types/interfaces.ts

export interface Proficiency {
  id: string;
  name: string;
  band: string;
  description: string;
}

export interface Topic {
  idTopic: string; // THIS MUST BE 'string', NOT 'string | undefined' or 'string?'
  name: string;
}

export interface Exam {
  idExam: string;
  nameExam: string;
  topicID: string;
  topicName?: string;
}