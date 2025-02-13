import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/lib/types";
import { auth } from "@/services/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const token = auth.getToken();
    if (token) {
      // Implement token validation and user data fetching
      // This is just a placeholder
      setUser({ id: "1", email: "user@example.com" });
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await auth.signIn(email, password);
      if (response) {
        setUser(response.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign out");
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await auth.signUp(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithGoogle();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to sign in with Google"
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        signIn,
        signOut,
        signUp,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
