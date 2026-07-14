"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";

type AuthResult = {
  error: string | null;
  user: User | null;
  session: Session | null;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;

  register: (
    email: string,
    password: string,
    fullName: string,
    businessName: string,
    phoneNumber: string
  ) => Promise<AuthResult>;

  login: (
    email: string,
    password: string
  ) => Promise<AuthResult>;

  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const register = async (
    email: string,
    password: string,
    fullName: string,
    businessName: string,
    phoneNumber: string
  ): Promise<AuthResult> => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          business_name: businessName.trim(),
          phone_number: phoneNumber.trim(),
        },
      },
    });

    if (error) {
      return {
        error: error.message,
        user: null,
        session: null,
      };
    }

    /*
      When email confirmation is disabled, Supabase usually returns
      an active session immediately.

      When email confirmation is enabled, data.user may exist while
      data.session is null until the user confirms their email.
    */
    if (data.session) {
      setSession(data.session);
      setUser(data.user);
    }

    return {
      error: null,
      user: data.user,
      session: data.session,
    };
  };

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

    if (error) {
      return {
        error: error.message,
        user: null,
        session: null,
      };
    }

    setUser(data.user);
    setSession(data.session);

    return {
      error: null,
      user: data.user,
      session: data.session,
    };
  };

  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    setUser(null);
    setSession(null);
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error(
            "Unable to restore authentication session:",
            error.message
          );
        }

        if (!mounted) return;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (!mounted) return;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}