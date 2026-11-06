// DEMO ONLY: fake sign-in stored in the browser so the "Minha conta" area can be
// previewed. Replace with real authentication (Lovable Cloud) later — keep the
// same hook shape (user, signIn, signOut) so pages don't change.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "inovix-demo-user";

export interface DemoUser {
  name: string;
  email: string;
  plan: "Essencial" | "Pro" | "Empresas";
}

interface AuthValue {
  user: DemoUser | null;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const signIn = (email: string, name?: string) => {
    const u: DemoUser = {
      email,
      name: name || email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      plan: "Pro",
    };
    setUser(u);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const signOut = () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useDemoAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useDemoAuth must be used inside DemoAuthProvider");
  return ctx;
}
