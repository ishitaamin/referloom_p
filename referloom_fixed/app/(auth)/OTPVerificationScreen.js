// referloom_frontend/app/(auth)/OTPVerificationScreen.js
import React, { useState, useRef } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

import { COLORS } from "../../src/theme/colors";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import { useAuth } from "../../src/context/AuthContext";
import ScreenWrapper from '../../src/components/ui/ScreenWrapper';
export default function OTPVerificationScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams(); 
  const { verifyOtp,register, pendingUser, sendOtp } = useAuth();
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length < 6) return setErrorMsg("Please enter the full 6-digit code.");
  
    setLoading(true);
    setErrorMsg("");
  
    try {
      // Append the OTP to the formData we saved earlier
      await verifyOtp(email, otpString);  // Step 1
await register(pendingUser);    
      
      Alert.alert("Welcome to Referloom!", "Account created successfully.");
      router.replace("/(roles)/student"); // Route them to their dashboard
    } catch (error) {
      setErrorMsg(error || "Invalid OTP or Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      await sendOtp(email);
      Alert.alert("Sent", "A new OTP has been sent to your email.");
    } catch (error) {
      setErrorMsg(error || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.header}>Verify Email</Text>
          <Text style={styles.subHeader}>
            We've sent a 6-digit verification code to <Text style={{ fontWeight: "700", color: COLORS.primary }}>{email || "your email"}</Text>.
          </Text>

          {errorMsg ? <Text style={styles.errorBox}>{errorMsg}</Text> : null}

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[styles.otpInput, digit && styles.otpInputFilled]}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <PrimaryButton title="Verify Account" onPress={handleVerify} isLoading={loading} />

          <TouchableOpacity style={styles.resendBtn} onPress={handleResend} disabled={loading}>
            <Text style={styles.resendText}>Didn't receive the code? <Text style={styles.resendLink}>Resend</Text></Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  backBtn: { marginBottom: 20, width: 40, height: 40, justifyContent: "center" },
  header: { fontSize: 32, fontWeight: "800", color: COLORS.primary, marginBottom: 8 },
  subHeader: { fontSize: 15, color: COLORS.text.secondary, lineHeight: 22, marginBottom: 30 },
  errorBox: { backgroundColor: "#FFE5E5", color: COLORS.error, padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 13, fontWeight: "600", textAlign: "center" },
  otpContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
  otpInput: { width: 50, height: 60, backgroundColor: COLORS.surface, borderRadius: 12, borderWidth: 2, borderColor: COLORS.border, fontSize: 24, fontWeight: "700", color: COLORS.primary, textAlign: "center" },
  otpInputFilled: { borderColor: COLORS.secondary, backgroundColor: COLORS.surface },
  resendBtn: { marginTop: 24, alignItems: "center" },
  resendText: { color: COLORS.text.secondary, fontSize: 14 },
  resendLink: { color: COLORS.primary, fontWeight: "700" },
});