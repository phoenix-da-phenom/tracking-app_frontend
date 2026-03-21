
import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useEffect, useState } from "react";
import axiosInstance from '../service/axiosInstance';
type AuthContextType = {
  userToken: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};
type Props = {
  children: ReactNode;
};
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: Props) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        setUserToken(token);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadToken();
  }, []);
  const login = async (token: string) => {

    try {
      const response = await axiosInstance.post("/login", {
      email: "test@example.com",
      password: "123456",
    });

    console.log(response.data);
      await SecureStore.setItemAsync("userToken", token);
      setUserToken(token);
    } catch (error) {
       console.log(error.response?.data || error.message);
    }
  };
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      setUserToken(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider value={{ userToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
