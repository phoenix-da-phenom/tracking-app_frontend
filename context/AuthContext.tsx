import axiosInstance from '@/service/axiosInstance';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Alert } from 'react-native';

type AuthContextType = {
  userToken: string | null;
  isLoading: boolean;           // renamed for clarity
  login: (email: string, password: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
  logout: () => Promise<void>;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: Props) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load token on mount
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        setUserToken(token);
      } catch (err) {
        console.error('Failed to load token:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true); // global loading (optional)

    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });

      const { token } = response.data; // adjust according to your real response

      await SecureStore.setItemAsync('userToken', token);
      setUserToken(token);
 // Replace with real auth logic later
    Alert.alert( `Welcome ${email.split("@")[0]}!`);
      return { success: true };
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.';

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const serverMsg = error.response?.data?.message || error.response?.data?.error;

        if (status === 401 || status === 400) {
          errorMessage = serverMsg || 'Incorrect email or password';
        } else if (status === 429) {
          errorMessage = 'Too many attempts. Try again later.';
        } else if (!error.response) {
          errorMessage = 'Network error. Check your connection.';
        }
      }

    Alert.alert("'Login failed:'",  errorMessage);

   
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      setUserToken(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};