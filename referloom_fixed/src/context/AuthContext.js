// referloom_frontend/src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [pendingUser, setPendingUser] = useState(null);
  

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          const { data } = await api.get('/users/profile');
          setUser(data);
        }
      } catch (error) {
        await SecureStore.deleteItemAsync('userToken');
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      console.log("\n==================================");
      console.log("🚦 1. INITIATING LOGIN REQUEST");
      console.log("📍 Target URL:", api.defaults.baseURL + '/auth/login');
      console.log("📦 Payload:", { email, password });

      const response = await api.post('/auth/login', { email, password });

      console.log("✅ 2. LOGIN SUCCESS FROM SERVER!");
      console.log("==================================\n");
      
      const { token, user: userData } = response.data;
      await SecureStore.setItemAsync('userToken', token);
      setUser(userData);
      router.replace('/'); 
    } catch (error) {
      console.log("❌ 2. LOGIN FAILED AT NETWORK LEVEL!");
      
      if (error.response) {
        console.log("🛑 Server Reached, but rejected us:", error.response.data);
      } else if (error.request) {
        console.log("🚧 Server NEVER Reached. Axios error:", error.message);
      } else {
        console.log("⚠️ Unknown Error:", error.message);
      }
      console.log("==================================\n");
      
      // Throwing the RAW error instead of a string
      throw error; 
    }
  };

  const register = async (formData) => {
    try {
      const formDataToSend = new FormData();
      Object.keys(rawFormData).forEach(key => {
        formDataToSend.append(key, rawFormData[key]);
      });

      const response = await api.post('/auth/register', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // ...
      // After successful registration, trigger OTP send automatically
      const email = formData._parts.find(part => part[0] === 'email')[1];
      await sendOtp(email);
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  // Inside AuthContext.tsx
  const initiateRegistration = async (rawFormData, email) => {
    try {
      await sendOtp(email); 
      setPendingUser(rawFormData); // Store raw JSON object here, not FormData
    } catch (error) {
      throw error;
    }
  };
  const sendOtp = async (email) => {
    try {
      // FIX: Changed from '/otp/send-otp' to '/otp/send' to match backend routes
      await api.post('/otp/send', { email });
    } catch (error) {
      throw error.response?.data?.message || 'Failed to send OTP';
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      await api.post('/otp/verify-otp', { email, otp });
    } catch (error) {
      throw error.response?.data?.message || "OTP verification failed";
    }
  };

  

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUser(null);
    router.replace('/(auth)/LoginScreen');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, sendOtp, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);