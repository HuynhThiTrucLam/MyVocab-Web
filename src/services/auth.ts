import { User } from "@/lib/types";

interface AuthResponse {
  user: User;
  token: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const auth = {
  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      // const response = await fetch(`${process.env.VITE_API_URL}/auth/login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      const response = Response.json({
        user: { id: "1", email: "user@example.com" },
        token: "1234567890",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new AuthError(error.message || "Failed to sign in");
      }

      const data = await response.json();

      // Store the token
      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError("An unexpected error occurred");
    }
  },

  signUp: async (email: string, password: string) => {
    // Implement sign up logic
  },

  signOut: async () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};
