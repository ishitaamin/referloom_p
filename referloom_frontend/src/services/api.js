// src/services/api.ts
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.API_URL || (Constants.manifest?.extra?.API_URL ?? "http://192.168.0.111:5000/api");

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

// attach token automatically
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
