import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth/LoginScreen" />
      <Stack.Screen name="auth/RoleSelectScreen" />
      <Stack.Screen name="auth/SignupStudentScreen" />
      <Stack.Screen name="auth/SignupAlumniScreen" />
      <Stack.Screen name="auth/SignupCompanyScreen" />
      <Stack.Screen name="home/StudentHomeScreen" />
      <Stack.Screen name="home/StudentProjectScreen" />
      <Stack.Screen name="home/StudentExploreScreen" />
      <Stack.Screen name="home/StudentChatScreen" />
      <Stack.Screen name="home/ProfileScreen" />
      <Stack.Screen name="home/AlumniHomeScreen" />
      <Stack.Screen name="home/CompanyHomeScreen" />
      <Stack.Screen name="home/EditProfile" />
      <Stack.Screen name="auth/OTPVerificationScreen" />
      <Stack.Screen name="home/FacultyHomeScreen" />
      <Stack.Screen name="home/HomeScreen" />
      <Stack.Screen name="home/UploadProjectScreen" />  
    </Stack>
  );
}
