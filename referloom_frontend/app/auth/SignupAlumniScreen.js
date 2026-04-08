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
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AlumniVerification() {
  const navigation = useNavigation();
  const route = useRoute();

  const phone = route.params?.phone || "";
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const [yearOpen, setYearOpen] = useState(false);
  const [degreeFile, setDegreeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const graduationYears = Array.from({ length: 15 }, (_, i) => 2024 - i);

  // ---- Pick File ----
  const pickDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setDegreeFile(result.assets[0]);
    }
  };

  // ---- Submit Data to Backend ----
  const handleSubmit = async () => {
    if (!fullName || !email || !selectedYear || !degreeFile) {
      Alert.alert("Missing Fields", "Please fill all fields & upload document");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", "alumni");
    formData.append("fullName", fullName);
    formData.append("graduationYear", selectedYear);
    formData.append("password", "123456"); // you can change this logic

    formData.append("degreeProof", {
      uri: degreeFile.uri,
      name: `degree_${Date.now()}.jpg`,
      type: "image/jpeg",
    });

    try {
      const res = await fetch("http://192.168.0.111:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Alumni Verified & Registered");
        navigation.navigate("auth/LoginScreen");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Network Error", "Check your connection");
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>Alumni Verification</Text>

        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Personal Email</Text>
          <TextInput
            placeholder="email@example.com"
            keyboardType="email-address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Graduation Year</Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setYearOpen(!yearOpen)}
          >
            <Text>
              {selectedYear ? selectedYear : "Select your graduation year"}
            </Text>
            <Ionicons name="chevron-down" size={20} />
          </TouchableOpacity>

          {yearOpen && (
            <View style={styles.dropdownList}>
              {graduationYears.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedYear(year);
                    setYearOpen(false);
                  }}
                >
                  <Text>{year}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Upload Degree Certificate</Text>

          <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
            <Ionicons name="cloud-upload-outline" size={35} color="#3827B1" />
            <Text style={{ marginTop: 10, color: "#555" }}>
              {degreeFile ? "File Selected" : "Upload from Gallery"}
            </Text>
          </TouchableOpacity>

          {degreeFile && (
            <Image
              source={{ uri: degreeFile.uri }}
              style={{ width: 120, height: 120, alignSelf: "center", marginBottom: 20 }}
            />
          )}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {loading ? "Submitting..." : "Verify & Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  label: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E3E7",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 5,
    fontSize: 14,
    backgroundColor: "#F7F8F9",
  },
  dropdown: {
    width: "100%",
    backgroundColor: "#F7F8F9",
    borderWidth: 1,
    borderColor: "#E2E3E7",
    borderRadius: 12,
    padding: 14,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownList: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#E2E3E7",
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E3E7",
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
  button: {
    backgroundColor: "#1D1A69",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
