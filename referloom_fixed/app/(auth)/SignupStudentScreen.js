// referloom_frontend/app/(auth)/SignupStudentScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../src/theme/colors";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import { useAuth } from "../../src/context/AuthContext";
import Toast from 'react-native-toast-message';
import ScreenWrapper from '../../src/components/ui/ScreenWrapper';

export default function SignupStudentScreen() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [form, setForm] = useState({ fullName: "", email: "", password: "", course: "", semester: "", university: "Navrachana University" });
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const { initiateRegistration } = useAuth();

  const handleRegister = async () => {
    if (!form.fullName || !form.email || !form.password || !form.course || !form.semester) {
      return alert("All fields are required.");
    }
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('role', 'student');
      formData.append('fullName', form.fullName);
      formData.append('email', form.email.toLowerCase().trim());
      formData.append('password', form.password);
      formData.append('course', form.course);
      formData.append('semester', form.semester);
      formData.append('university', form.university);

      await register(formData);
      router.push({ pathname: "/(auth)/OTPVerificationScreen", params: { email: form.email } });
    } catch (error) {
      alert(error || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // Inside SignupStudentScreen.js
const handleNext = async () => {
  if (!form.fullName || !form.email || !form.password || !form.course || !form.semester) {
    return alert("All fields are required.");
  }
  
  setLoading(true);
  try {
    // Replace the FormData block with this:
const rawFormData = {
  role: 'student',
  fullName: form.fullName,
  email: form.email.toLowerCase().trim(),
  password: form.password,
  course: form.course,
  semester: form.semester,
  university: form.university
};
await initiateRegistration(rawFormData, form.email);
    // Navigate to OTP Screen
    router.push({ pathname: "/(auth)/OTPVerificationScreen", params: { email: form.email } });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Registration Failed',
      text2: error || "Failed to send OTP.",
      position: 'bottom'
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <ScreenWrapper>
    <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}><Feather name="arrow-left" size={24} color={COLORS.primary} /></TouchableOpacity>
        <Text style={styles.header}>Student Identity</Text>
        <Text style={styles.subHeader}>Fill in your academic details to get started.</Text>

        <TextInput style={styles.input} placeholder="Full Name" value={form.fullName} onChangeText={(t) => setForm({ ...form, fullName: t })} />
        <TextInput style={styles.input} placeholder="College Email (.edu / .ac.in)" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={(t) => setForm({ ...form, email: t })} />
        
        <View style={styles.passwordRow}>
          <TextInput style={styles.passwordInput} placeholder="Password" secureTextEntry={hidePassword} value={form.password} onChangeText={(t) => setForm({ ...form, password: t })} />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}><Feather name={hidePassword ? "eye-off" : "eye"} size={20} color="#666" /></TouchableOpacity>
        </View>

        {/* Missing Data Added Below */}
        <TextInput style={styles.input} placeholder="Course (e.g., B.Tech CSE)" value={form.course} onChangeText={(t) => setForm({ ...form, course: t })} />
        <TextInput style={styles.input} placeholder="Current Semester (e.g., 6)" keyboardType="numeric" value={form.semester} onChangeText={(t) => setForm({ ...form, semester: t })} />
        <TextInput style={styles.input} placeholder="University" value={form.university} onChangeText={(t) => setForm({ ...form, university: t })} editable={false} />

        <PrimaryButton title="Next: Verify Email" onPress={handleNext} isLoading={loading} style={{ marginTop: 20 }} />
      </ScrollView>
    </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background || '#FFF' },
  container: { flexGrow: 1, padding: 24, paddingTop: 40 },
  backBtn: { marginBottom: 20 },
  header: { fontSize: 32, fontWeight: "800", color: COLORS.text?.primary, marginBottom: 8 },
  subHeader: { fontSize: 15, color: COLORS.text?.secondary, marginBottom: 30 },
  input: { backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 16, marginBottom: 16, fontSize: 15 },
  passwordRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, paddingHorizontal: 16, marginBottom: 16 },
  passwordInput: { flex: 1, paddingVertical: 16, fontSize: 15 }
});