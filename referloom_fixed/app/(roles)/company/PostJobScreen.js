// referloom_frontend/app/(roles)/company/PostJobScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../../src/theme/colors";
import PrimaryButton from "../../../src/components/ui/PrimaryButton";
import api from "../../../src/services/api";
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function PostJobScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Full-Time",
    location: "",
    requiredSkills: "" // Crucial for AI Match
  });

  const handlePost = async () => {
    if (!form.title || !form.requiredSkills) return alert("Title and Required Skills are mandatory.");

    setLoading(true);
    try {
      const payload = {
        ...form,
        // Convert comma string to array for the backend Match engine
        requiredSkills: form.requiredSkills.split(",").map(s => s.trim()).filter(s => s)
      };

      await api.post("/jobs", payload);
      alert("Job posted successfully!");
      router.back();
    } catch (error) {
      alert("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-left" size={24} color={COLORS.text?.primary} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Create Job Post</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Job Title *</Text>
        <TextInput style={styles.input} value={form.title} onChangeText={(t) => setForm({...form, title: t})} placeholder="e.g. SDE Intern" />

        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} value={form.location} onChangeText={(t) => setForm({...form, location: t})} placeholder="e.g. Remote, Mumbai" />

        <Text style={styles.label}>Required Skills (Comma separated) *</Text>
        <TextInput style={styles.input} value={form.requiredSkills} onChangeText={(t) => setForm({...form, requiredSkills: t})} placeholder="e.g. React Native, Node.js, MongoDB" />
        <Text style={styles.helperText}>Used by our AI to match students to this role.</Text>

        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, styles.textArea]} value={form.description} onChangeText={(t) => setForm({...form, description: t})} placeholder="Describe the role..." multiline />

        <PrimaryButton title="Publish Job" onPress={handlePost} isLoading={loading} style={{ marginTop: 20 }} />
      </ScrollView>
    </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: COLORS.border },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text?.primary },
  container: { padding: 20, paddingBottom: 40, backgroundColor: COLORS.background },
  label: { fontSize: 14, fontWeight: "600", color: COLORS.text?.primary, marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 14, fontSize: 15 },
  textArea: { height: 120, textAlignVertical: "top" },
  helperText: { fontSize: 12, color: COLORS.primary, marginTop: 4 }
});