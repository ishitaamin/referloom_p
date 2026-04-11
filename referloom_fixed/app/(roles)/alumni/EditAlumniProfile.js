import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { COLORS } from '../../../src/theme/colors';
import PrimaryButton from '../../../src/components/ui/PrimaryButton';
import { useAuth } from '../../../src/context/AuthContext';
import api from '../../../src/services/api'; // ✅ Import API
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function EditAlumniProfile() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    graduationYear: user?.alumni?.graduationYear || '',
    companyName: user?.alumni?.company || '', 
    designation: user?.alumni?.role || '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // ✅ Call backend to update Alumni profile details
      await api.put('/users/profile', {
        fullName: form.fullName,
        alumniDetails: {
          graduationYear: form.graduationYear,
          company: form.companyName,
          role: form.designation
        }
      });
      
      Alert.alert("Success", "Career Journey Updated!");
      router.back();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScreenWrapper>
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-left" size={24} color={COLORS.primary} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Career Journey</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={form.fullName} onChangeText={(t) => setForm({...form, fullName: t})} />

      <Text style={styles.label}>Graduation Year</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={form.graduationYear?.toString()} onChangeText={(t) => setForm({...form, graduationYear: t})} />

      <Text style={styles.sectionTitle}>Current Employment</Text>
      
      <Text style={styles.label}>Company Name</Text>
      <TextInput style={styles.input} placeholder="e.g. Google, Microsoft" value={form.companyName} onChangeText={(t) => setForm({...form, companyName: t})} />

      <Text style={styles.label}>Designation / Role</Text>
      <TextInput style={styles.input} placeholder="e.g. Senior Software Engineer" value={form.designation} onChangeText={(t) => setForm({...form, designation: t})} />

      <PrimaryButton title="Save Profile" onPress={handleSave} isLoading={isSaving} style={{ marginTop: 20 }} />
    </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, marginTop: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginTop: 20, marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text.secondary, marginBottom: 8 },
  input: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 16, color: COLORS.text.primary },
});