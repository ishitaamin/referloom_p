import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export default function RoleSelectScreen() {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();


  const roles = [
    { id: "student", title: "Student", subtitle: "For current students at the university", icon: "school-outline" },
    { id: "alumni", title: "Alumni", subtitle: "For graduates connecting back to students", icon: "briefcase-outline" },
    { id: "company", title: "Company", subtitle: "For companies exploring candidates", icon: "grid-outline" },
    { id: "faculty", title: "Faculty/Admin", subtitle: "For university staff and administrators", icon: "shield-outline" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        
        <Text style={styles.header}>How will you use Referloom?</Text>

        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          {roles.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.optionBox,
                selected === item.id && styles.optionBoxSelected,
              ]}
              onPress={() => setSelected(item.id)}
            >
              <Ionicons name={item.icon} size={28} color="#4A4A8E" style={{ marginRight: 20 }} />

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>

              {selected === item.id && (
                <Ionicons name="checkmark-circle" size={26} color="#4A4A8E" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bottom Button (proper padding, not touching bottom) */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
  style={[styles.button, !selected && { opacity: 0.4 }]}
  disabled={!selected}
  onPress={() => {
    if (selected === "student") {
      navigation.navigate("auth/SignupStudentScreen");
    } 
    else if (selected === "alumni") {
      navigation.navigate("auth/SignupAlumniScreen");
    } 
    else if (selected === "company") {
      navigation.navigate("auth/SignupCompanyScreen");
    } 
    else if (selected === "faculty") {
      navigation.navigate("auth/SignupFacultyScreen");
    }
  }}
>
  <Text style={styles.buttonText}>Continue</Text>
</TouchableOpacity>

        </View>

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
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 25,
  },
  optionBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    padding: 20,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  optionBoxSelected: {
    borderColor: "#4A4A8E",
    borderWidth: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C28",
  },
  subtitle: {
    fontSize: 13,
    color: "#7A7A8C",
    marginTop: 4,
  },

  bottomContainer: {
    paddingVertical: 15,
    paddingBottom: 25, // 👈 creates space from bottom
  },

  button: {
    width: "100%",
    backgroundColor: "#2B255C",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
