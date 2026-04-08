// src/services/authService.ts
import api from "./api";

export const sendOtp = (mobile: string) => {
  return api.post("/auth/send-otp", { mobile });
};

export const verifyOtp = (mobile: string, otp: string) => {
  return api.post("/auth/verify-otp", { mobile, otp });
};

// signup endpoints
export const signupStudent = (payload: { universityId: string, mobile: string, password: string }) =>
  api.post("/auth/signup/student", payload);

export const signupTeacher = (payload: { universityId: string, mobile: string }) =>
  api.post("/auth/signup/teacher", payload);

export const signupAlumni = (payload: { pastUniversityId: string, mobile: string, password: string }) =>
  api.post("/auth/signup/alumni", payload);

export const signupCompany = (payload: { email: string, companyName: string, password: string }) =>
  api.post("/auth/signup/company", payload);

// login
export const login = (identifier: string, password?: string) =>
  api.post("/auth/login", { identifier, password });
