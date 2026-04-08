import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CompanyRegistrationScreen() {
  const navigation = useNavigation();

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [idFile, setIdFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pick document/image
  const pickDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setIdFile(result.assets[0]);
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  // Submit form
  const handleSubmit = async () => {
    if (!fullName || !email || !companyName || !designation || !idFile) {
      Alert.alert("Missing Fields", "Please fill all fields & upload document");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid company email");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("companyName", companyName);
    formData.append("designation", designation);
    formData.append("role", "company");
    formData.append("idProof", {
      uri: idFile.uri,
      name: `id_${Date.now()}.jpg`,
      type: "image/jpeg",
    });

    try {
      const res = await fetch("http://192.168.0.111:5000/register", {
        method: "POST",
        body: formData, // no Content-Type, fetch handles it
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Company Registered Successfully");
        navigation.navigate("auth/LoginScreen");
      } else {
        Alert.alert("Error", data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Network Error", "Cannot reach server");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={22} color="#000" />
          <Text style={styles.headerTitle}>Company Registration</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Full Name */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#9EA4AE"
          value={fullName}
          onChangeText={setFullName}
        />

        {/* Company Email */}
        <Text style={styles.label}>Official Company Email</Text>
        <TextInput
          style={styles.input}
          placeholder="your.name@company.com"
          placeholderTextColor="#9EA4AE"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Company Name */}
        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter company name"
          placeholderTextColor="#9EA4AE"
          value={companyName}
          onChangeText={setCompanyName}
        />

        {/* Designation */}
        <Text style={styles.label}>Designation</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Software Engineer"
          placeholderTextColor="#9EA4AE"
          value={designation}
          onChangeText={setDesignation}
        />

        {/* Upload ID */}
        <Text style={styles.label}>Upload Company ID / Letterhead</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
          <Ionicons name="cloud-upload-outline" size={30} color="#5B5BFF" />
          <Text style={styles.uploadText}>
            {idFile ? "File Selected" : "Upload from Camera or Gallery"}
          </Text>
        </TouchableOpacity>

        {idFile && (
          <Image
            source={{ uri: idFile.uri }}
            style={{ width: 120, height: 120, alignSelf: "center", marginTop: 10 }}
          />
        )}

        {/* Submit */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Submitting..." : "Verify & Continue"}</Text>
        </TouchableOpacity>

        {/* Already have account */}
        <TouchableOpacity
          style={{ marginTop: 12 }}
          onPress={() => navigation.navigate("auth/LoginScreen")}
        >
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 25 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
  label: { marginTop: 22, fontSize: 14, fontWeight: "500", color: "#000" },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#F7F8F9",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E2E3E7",
  },
  uploadBox: {
    height: 140,
    borderWidth: 1.5,
    borderColor: "#D3D3D3",
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  uploadText: { marginTop: 10, fontSize: 13, color: "#606060", textAlign: "center" },
  button: {
    backgroundColor: "#1D1A69",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  loginText: { textAlign: "center", color: "#606060", fontSize: 13, marginTop: 12 },
  loginLink: { color: "#3C5FF4", fontWeight: "600" },
});
