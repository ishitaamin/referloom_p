
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

// Replace with your local machine's IP address if testing on a physical device, 
// or 10.0.2.2 if testing on an Android Emulator
const API_URL = 'http://192.168.29.68:5001/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🚀 REQUEST INTERCEPTOR: Attach token to every request
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching token from SecureStore", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🛡️ RESPONSE INTERCEPTOR: Handle expired tokens globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("🚨 Token expired or invalid. Logging out...");
      
      // Clear the invalid token
      await SecureStore.deleteItemAsync('userToken');
      
      // Force user back to login
      router.replace('/(auth)/LoginScreen');
    }
    return Promise.reject(error);
  }
);

export default api;