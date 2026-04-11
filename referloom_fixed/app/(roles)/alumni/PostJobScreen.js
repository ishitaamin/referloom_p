import React, { useState } from "react";
import {
  SafeAreaView,
  View,
 Text,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { COLORS } from "../../../src/theme/colors";
import PrimaryButton from "../../../src/components/ui/PrimaryButton";
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function PostJobScreen() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("job");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title || !description || !type || !company || !location) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      // API call here
      /*
      await api.post("/alumni/post", {
        title,
        description,
        type,
        company,
        location,
      });
      */

      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Opportunity posted successfully!");
      router.back();
    } catch (error) {
      alert("Failed to post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          
          <Text style={styles.header}>Post Opportunity</Text>

          {/* Title */}
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Frontend Intern"
            placeholderTextColor="#9aa0b4"
          />

          {/* Company */}
          <Text style={styles.label}>Company / Organization</Text>
          <TextInput
            style={styles.input}
            value={company}
            onChangeText={setCompany}
            placeholder="e.g. Google, Startup XYZ"
            placeholderTextColor="#9aa0b4"
          />

          {/* Type Dropdown */}
          <Text style={styles.label}>Opportunity Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) => setType(itemValue)}
            >
              <Picker.Item label="Job" value="job" />
              <Picker.Item label="Internship" value="internship" />
              <Picker.Item label="Mentorship Session" value="mentorship" />
            </Picker>
          </View>

          {/* Location */}
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="e.g. Remote / Vadodara / Hybrid"
            placeholderTextColor="#9aa0b4"
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the opportunity..."
            placeholderTextColor="#9aa0b4"
            multiline
            numberOfLines={4}
          />

          {/* Button */}
          <PrimaryButton
            title="Post Opportunity"
            onPress={handlePost}
            isLoading={loading}
            style={{ marginTop: 20 }}
          />

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text.primary,
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: 8,
  },

  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 15,
    color: COLORS.text.primary,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  pickerWrapper: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },
});