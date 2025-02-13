import { googleProvider, auth as firebaseAuth } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { User } from "@/lib/types";
import axios from "axios";

interface AuthResponse {
  user: User;
  token: string;
}

interface GoogleUserInfo {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

const handleAuthError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw new AuthError(
      error.response?.data?.message || "Authentication failed"
    );
  }
  throw new AuthError("An unexpected error occurred");
};

export const auth = {
  signIn: async (email: string, password: string) => {
    try {
      // For development/testing
      return {
        user: { id: "1", email: "user@example.com" },
        token: "1234567890",
      };

      // For production
      // const { data } = await axios.post<AuthResponse>(`${import.meta.env.VITE_API_URL}/auth/login`, {
      //   email,
      //   password,
      // });
      // localStorage.setItem("token", data.token);
      // return data;
    } catch (error) {
      handleAuthError(error);
    }
  },

  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const user = result.user;
      // const { data } = await axios.post<AuthResponse>(
      //   `${import.meta.env.VITE_API_URL}/auth/login`,
      //   {
      //     email: user.email,
      //     password: user.uid,
      //   }
      // );
      // localStorage.setItem("token", data.token);
      // return data;

      // TODO: Implement this
      return {
        user: { id: "1", email: "user@example.com" },
        token: "1234567890",
      };
    } catch (error) {
      handleAuthError(error);
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      const { data } = await axios.post<AuthResponse>(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { email, password }
      );
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      handleAuthError(error);
    }
  },

  signOut: async (): Promise<void> => {
    try {
      // You might want to call your backend to invalidate the token
      // await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
      localStorage.removeItem("token");
    } catch (error) {
      handleAuthError(error);
    }
  },

  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },

  refreshToken: async () => {
    try {
      const { data } = await axios.post<AuthResponse>(
        `${import.meta.env.VITE_API_URL}/auth/refresh`
      );
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      handleAuthError(error);
    }
  },
};
