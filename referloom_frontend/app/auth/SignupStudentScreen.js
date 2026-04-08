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
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function StudentVerifyScreen() {
  const navigation = useNavigation();

  // Input state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [semesterOpen, setSemesterOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const branches = ["CSE", "IT", "ECE", "Civil", "Mechanical", "Architecture"];

  // Validate email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!fullName || !email || !enrollmentNo || !selectedSemester || !selectedBranch) {
      Alert.alert("Missing Fields", "Please fill all the fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Enter a valid university email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://192.168.0.111:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          enrollmentNo,
          semester: selectedSemester,
          branch: selectedBranch,
          role: "student",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Student Verified Successfully");
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
      <View style={styles.container}>
        <Text style={styles.header}>Verify you're a Navrachana student</Text>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* Full Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            style={styles.input}
            placeholderTextColor="#A5A5A5"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* University Email */}
          <Text style={styles.label}>University Email</Text>
          <TextInput
            placeholder="your.name@nuv.ac.in"
            style={styles.input}
            placeholderTextColor="#A5A5A5"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Enrollment Number */}
          <Text style={styles.label}>Enrollment Number</Text>
          <TextInput
            placeholder="Enter your enrollment number"
            style={styles.input}
            placeholderTextColor="#A5A5A5"
            value={enrollmentNo}
            onChangeText={setEnrollmentNo}
          />

          {/* Semester Dropdown */}
          <Text style={styles.label}>Current Semester</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setSemesterOpen(!semesterOpen)}
          >
            <Text style={{ color: selectedSemester ? "#000" : "#A5A5A5" }}>
              {selectedSemester || "Select your semester"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6A6A6A" />
          </TouchableOpacity>
          {semesterOpen && (
            <View style={styles.dropdownList}>
              {semesters.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedSemester(item);
                    setSemesterOpen(false);
                  }}
                >
                  <Text style={{ fontSize: 15 }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Branch Dropdown */}
          <Text style={styles.label}>Branch</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setBranchOpen(!branchOpen)}
          >
            <Text style={{ color: selectedBranch ? "#000" : "#A5A5A5" }}>
              {selectedBranch || "Select your branch"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6A6A6A" />
          </TouchableOpacity>
          {branchOpen && (
            <View style={styles.dropdownList}>
              {branches.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedBranch(item);
                    setBranchOpen(false);
                  }}
                >
                  <Text style={{ fontSize: 15 }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Verify & Continue</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 12 }}
            onPress={() => navigation.navigate("auth/LoginScreen")}
          >
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
  header: { fontSize: 20, fontWeight: "600", marginBottom: 25, marginTop: 10 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 6, color: "#333" },
  input: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginBottom: 18,
  },
  dropdown: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    marginBottom: 18,
    overflow: "hidden",
  },
  dropdownItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  bottomContainer: { paddingVertical: 20, paddingBottom: 25 },
  button: {
    width: "100%",
    backgroundColor: "#2B255C",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  loginText: { textAlign: "center", color: "#555" },
  loginLink: { color: "#2B75FF", fontWeight: "600" },
});
