import { createContext } from "react";

export interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: {
    email: string;
    name: string;
    createdAt: string;
    token: string;
  } | null;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);
