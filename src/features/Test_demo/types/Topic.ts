

export interface Topic {
  idTopic: string;
  name: string;
  proficienciesId: string; // Foreign Key referencing Proficiencies
}

