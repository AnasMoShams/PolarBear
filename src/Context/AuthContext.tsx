"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import type { User } from "@supabase/supabase-js";

import { supabase } from "@/utils/supabase/client";

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const adminUserId = process.env.NEXT_PUBLIC_ADMIN_USER_ID;

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setIsLoading(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAdmin =
    !!user &&
    !!adminUserId &&
    user.id === adminUserId;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};