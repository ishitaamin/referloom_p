// referloom_frontend/app/(auth)/SignupCompanyScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../src/theme/colors";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import { useAuth } from "../../src/context/AuthContext";
import ScreenWrapper from '../../src/components/ui/ScreenWrapper';


export default function SignupCompanyScreen() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [form, setForm] = useState({ companyName: "", hrName: "", email: "", password: "", industryType: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.companyName || !form.hrName || !form.email || !form.password) return alert("Please fill all required fields.");
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('role', 'company');
      formData.append('fullName', form.hrName); // Mapped to the base User schema 'fullName'
      formData.append('email', form.email.toLowerCase().trim());
      formData.append('password', form.password);
      formData.append('companyName', form.companyName);
      formData.append('industryType', form.industryType);

      await initiateRegistration(formData, form.email);
      router.push({ pathname: "/(auth)/OTPVerificationScreen", params: { email: form.email } });      router.push({ pathname: "/(auth)/OTPVerificationScreen", params: { email: form.email } });
    } catch (error) {
      alert(error || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
    <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}><Feather name="arrow-left" size={24} color={COLORS.primary} /></TouchableOpacity>
        <Text style={styles.header}>Company Portal</Text>
        <Text style={styles.subHeader}>Hire pre-vetted campus talent directly.</Text>

        <TextInput style={styles.input} placeholder="Company Name *" value={form.companyName} onChangeText={(t) => setForm({ ...form, companyName: t })} />
        <TextInput style={styles.input} placeholder="HR / Recruiter Full Name *" value={form.hrName} onChangeText={(t) => setForm({ ...form, hrName: t })} />
        <TextInput style={styles.input} placeholder="Corporate Email *" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={(t) => setForm({ ...form, email: t })} />
        <TextInput style={styles.input} placeholder="Password *" secureTextEntry value={form.password} onChangeText={(t) => setForm({ ...form, password: t })} />
        <TextInput style={styles.input} placeholder="Industry (e.g., IT, Finance)" value={form.industryType} onChangeText={(t) => setForm({ ...form, industryType: t })} />

        <PrimaryButton title="Create Company Account" onPress={handleRegister} isLoading={loading} style={{ marginTop: 20 }} />
      </ScrollView>
    </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
// ... copy styles from Student ...

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