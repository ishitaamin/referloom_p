import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function UploadProject({ navigation }) {
  const [visibility, setVisibility] = useState("Everyone");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [techUsed, setTechUsed] = useState(["React", "Node.js", "Figma"]);

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("home/StudentProjectScreen")}>
          <Ionicons name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Project</Text>
      </View>

      {/* Project Title */}
      <Text style={styles.label}>Project Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project title"
      />

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        placeholder="Describe your project"
      />

      {/* Category */}
      <Text style={styles.label}>Category</Text>
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {selectedCategory || "Select a category"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#888" />
      </TouchableOpacity>

      {/* Technologies Used */}
      <Text style={styles.label}>Technologies Used</Text>
      <View style={styles.techContainer}>
        {techUsed.map((tech, index) => (
          <View key={index} style={styles.techChip}>
            <Text style={styles.techChipText}>{tech}</Text>
          </View>
        ))}
      </View>

      {/* GitHub Link */}
      <Text style={styles.label}>GitHub Link</Text>
      <TextInput
        style={styles.input}
        placeholder="https://github.com/username/repo"
        autoCapitalize="none"
      />

      {/* Upload Files */}
      <View style={styles.uploadBox}>
        <Ionicons name="cloud-upload-outline" size={34} color="#4A3AFF" />
        <Text style={styles.uploadText}>Upload files</Text>
      </View>

      {/* Visibility */}
      <Text style={styles.label}>Visibility</Text>
      <View style={styles.visibilityRow}>
        {["Everyone", "Alumni only", "Companies only"].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setVisibility(option)}
            style={[
              styles.visibilityButton,
              visibility === option && styles.visibilityActive,
            ]}
          >
            <Text
              style={[
                styles.visibilityText,
                visibility === option && styles.visibilityTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Publish Button */}
      <TouchableOpacity style={styles.publishButton}>
        <Text style={styles.publishButtonText}>Publish Project</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 20,

  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
    backgroundColor: "#FFF",
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#DADADA",
    padding: 12,
    borderRadius: 10,
    marginBottom: 18,
  },

  dropdownText: {
    color: "#666",
  },

  techContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    gap: 10,
  },

  techChip: {
    backgroundColor: "#DFF6F2",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  techChipText: {
    color: "#0B8A6E",
    fontWeight: "500",
  },

  uploadBox: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 12,
    borderColor: "#BEBEBE",
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  uploadText: {
    marginTop: 10,
    color: "#4A3AFF",
    fontWeight: "600",
  },

  visibilityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  visibilityButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 20,
  },

  visibilityActive: {
    backgroundColor: "#ECEAFF",
    borderColor: "#4A3AFF",
  },

  visibilityText: {
    color: "#666",
    fontWeight: "500",
  },

  visibilityTextActive: {
    color: "#4A3AFF",
  },

  publishButton: {
    backgroundColor: "#4A3AFF",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 50,
  },

  publishButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
