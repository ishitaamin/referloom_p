import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router"

export default function LoginScreen() {
  const navigation = useNavigation();
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  

  const handleLogin = async () => {
  if (!email || !password) {
    setErrorMsg("Email and password are required");
    return;
  }

  setLoading(true);
  setErrorMsg("");

  try {
    const response = await fetch("http://172.20.10.12:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMsg(data.message || "Invalid email or password");
      setLoading(false);
      return;
    }

    // Save token & user details
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    await AsyncStorage.setItem("role", data.user.role);

    console.log("Logged in:", data.user.role);

    // Redirect based on role
    if (data.user.role === "student") {
  router.replace("/home/StudentHomeScreen");
} else if (data.user.role === "alumni") {
  router.replace("/home/AlumniHomeScreen");
} else if (data.user.role === "company") {
  router.replace("/home/CompanyHomeScreen");
} else if (data.user.role === "faculty") {
  router.replace("/home/FacultyHomeScreen");
} else {
  router.replace("/home/HomeScreen");
}

  } catch (error) {
    setErrorMsg("Network error. Please try again.");
    console.log("Login error:", error);
  }

  setLoading(false);
};



  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>

            <Text style={styles.brand}>Referloom</Text>

            <View style={styles.headerBox}>
              <Text style={styles.welcome}>Welcome to Referloom</Text>
              <Text style={styles.sub}>
                College Career Collaboration Network
              </Text>
            </View>

            {/* Error Message */}
            {errorMsg ? (
              <Text style={styles.error}>{errorMsg}</Text>
            ) : null}

            {/* Email */}
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputRow}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={18}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9aa0b4"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputRow}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={18}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={hidePassword}
                  autoCapitalize="none"
                  placeholderTextColor="#9aa0b4"
                />
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                  style={styles.eyeBtn}
                >
                  <Feather
                    name={hidePassword ? "eye-off" : "eye"}
                    size={18}
                    color="#8a8f9b"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginBtnText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.noAcc}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/auth/OTPVerificationScreen")}>
              <Text style={styles.createLink}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PURPLE = "#221244";
const BUTTON = "#2B1F5A";
const LIGHT_GRAY = "#f2f4f8";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 6,
  },

  brand: {
    textAlign: "center",
    fontSize: 34,
    color: PURPLE,
    fontWeight: "700",
    marginBottom: 15,
  },

  headerBox: { alignItems: "center", marginBottom: 10 },
  welcome: { fontSize: 17, fontWeight: "700", color: "#222" },
  sub: { fontSize: 12, color: "#8a8f9b", marginTop: 4 },

  error: {
    marginTop: 8,
    color: "red",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 5,
  },

  inputWrap: { marginTop: 14 },
  label: { fontSize: 13, color: "#8a8f9b", marginBottom: 8 },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LIGHT_GRAY,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  icon: { color: "#9aa0b4", marginRight: 8 },

  input: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    color: "#222",
  },

  eyeBtn: { marginLeft: 8 },

  loginBtn: {
    marginTop: 26,
    backgroundColor: BUTTON,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  loginBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  footer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
  },

  noAcc: { color: "#9aa0b4", fontSize: 13 },
  createLink: { color: "#15b57b", fontSize: 13, fontWeight: "600" },
});
