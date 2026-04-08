// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  mobile?: string;
  email?: string;
  userType?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  setAuth: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setAuth: async () => {},
  signOut: async () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem("token");
      const u = await AsyncStorage.getItem("user");
      if (t && u) {
        setToken(t);
        setUser(JSON.parse(u));
      }
    })();
  }, []);

  const setAuth = async (t: string, u: User) => {
    await AsyncStorage.setItem("token", t);
    await AsyncStorage.setItem("user", JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
