import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfile({ navigation }) {
  const [skills, setSkills] = useState(["Product Management", "UI/UX Design", "Agile"]);
  const [newSkill, setNewSkill] = useState("");
  const [mentorToggle, setMentorToggle] = useState(true);

  const removeSkill = (skill) => {
    setSkills(skills.filter((item) => item !== skill));
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("home/ProfileScreen")}>
          <Ionicons name="chevron-back" size={28} color="#4A4A4A" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <Image
  source={require("../../assets/images/profile.jpg")}
  style={styles.profileImage}
/>

        <TouchableOpacity style={styles.changePhotoButton}>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} placeholder="Ishita Amin" />

      {/* Bio */}
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Passionate Web & Software Developer currently pursuing my B.Tech in Computer Science from Navrachana University. With hands-on experience in frontend and backend technologies through internships and personal projects"
        multiline
      />

      {/* Phone Number */}
      <Text style={styles.label}>Phone number</Text>
      <TextInput style={styles.input} placeholder="+91 9327252376" keyboardType="phone-pad" />

      {/* Skills */}
      <Text style={styles.label}>Add/Remove Skills</Text>

      <View style={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skillChip}>
            <Text style={styles.skillText}>{skill}</Text>
            <TouchableOpacity onPress={() => removeSkill(skill)}>
              <Ionicons name="close" size={16} color="#555" />
            </TouchableOpacity>
          </View>
        ))}

        {/* + Add button */}
        <TouchableOpacity style={styles.addSkillButton} onPress={addSkill}>
          <Ionicons name="add" size={18} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      {/* LinkedIn URL */}
      <Text style={styles.label}>GitHub URL</Text>
      <TextInput
        style={styles.input}
        placeholder="github.com/in/yourprofile"
        autoCapitalize="none"
      />

      {/* Current Company */}
      <Text style={styles.label}>Current Company & Designation</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Product Manager at MRI"
      />

      {/* Mentor Toggle */}
      <View style={styles.toggleRow}>
        <Text style={styles.toggleText}>Open to mentor juniors</Text>
        <Switch value={mentorToggle} onValueChange={setMentorToggle} thumbColor="#fff" />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate("home/ProfileScreen")}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
    color: "#1A1A1A",
  },

  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },

  changePhotoButton: {
    marginTop: 10,
    backgroundColor: "#EEF0FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },

  changePhotoText: {
    color: "#3C40C6",
    fontWeight: "600",
  },

  label: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 14,
    backgroundColor: "#FFF",
  },

  bioInput: {
    height: 90,
    textAlignVertical: "top",
  },

  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
    paddingVertical: 5,
  },

  skillChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F7F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  skillText: {
    marginRight: 6,
    color: "#333",
  },

  addSkillButton: {
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 20,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  toggleText: {
    fontSize: 15,
    fontWeight: "500",
  },

  saveButton: {
    backgroundColor: "#3C40C6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  cancelButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 30,
  },

  cancelButtonText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
});
