// accounts.ts
export interface Account {
  id: string;
  username: string;
  email: string;
  numberPhone: string;
  password?: string; // Password should ideally not be exposed in frontend mock data
}

export const mockAccounts: Account[] = [
  {
    id: "acc1",
    username: "john_doe",
    email: "john.doe@example.com",
    numberPhone: "123-456-7890",
    password: "hashed_password_1",
  },
  {
    id: "acc2",
    username: "jane_smith",
    email: "jane.smith@example.com",
    numberPhone: "098-765-4321",
    password: "hashed_password_2",
  },
  {
    id: "acc3",
    username: "peter_jones",
    email: "peter.jones@example.com",
    numberPhone: "555-111-2222",
    password: "hashed_password_3",
  },
  {
    id: "acc4",
    username: "alice_wonder",
    email: "alice.w@example.com",
    numberPhone: "111-222-3333",
    password: "hashed_password_4",
  },
  {
    id: "acc5",
    username: "bob_builder",
    email: "bob.b@example.com",
    numberPhone: "444-555-6666",
    password: "hashed_password_5",
  },
];