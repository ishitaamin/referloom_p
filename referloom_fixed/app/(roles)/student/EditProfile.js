// referloom_frontend/app/(roles)/student/EditProfile.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../src/context/AuthContext';
import { COLORS } from '../../../src/theme/colors';
import PrimaryButton from '../../../src/components/ui/PrimaryButton';
import api from '../../../src/services/api';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function EditProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Pre-fill form with existing user data
  const [form, setForm] = useState({
    headline: user?.headline || '',
    bio: user?.bio || '',
    skills: user?.skills?.join(', ') || '',
    visibilityMode: user?.visibilityMode === 'public'
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedData = {
        headline: form.headline,
        bio: form.bio,
        skills: form.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
        visibilityMode: form.visibilityMode ? 'public' : 'private'
      };

      // Ensure your backend has a PUT /users/profile route to handle this
      await api.put('/users/profile', updatedData);
      
      alert("Profile updated successfully!");
      // NOTE: In a real app, you'd update AuthContext state here or refetch user
      router.back();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="x" size={24} color={COLORS.text?.primary || '#333'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Professional Headline</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g., Full-Stack React Native Developer"
          value={form.headline}
          onChangeText={(t) => setForm({...form, headline: t})}
        />

        <Text style={styles.label}>About Me (Bio)</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Tell recruiters and alumni about your goals..."
          value={form.bio}
          onChangeText={(t) => setForm({...form, bio: t})}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Top Skills (Comma Separated)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g., React Native, Node.js, MongoDB"
          value={form.skills}
          onChangeText={(t) => setForm({...form, skills: t})}
        />

        {/* The Privacy Engine Toggle */}
        <View style={styles.privacyContainer}>
          <View style={styles.privacyTextContainer}>
            <Text style={styles.privacyTitle}>Public Profile</Text>
            <Text style={styles.privacyDesc}>
              {form.visibilityMode 
                ? "Your full profile is visible to verified Alumni and Companies." 
                : "Your profile is hidden. You must manually grant access to recruiters."}
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={form.visibilityMode ? COLORS.primary || "#007AFF" : "#f4f3f4"}
            onValueChange={(val) => setForm({...form, visibilityMode: val})}
            value={form.visibilityMode}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Save Changes" onPress={handleSave} isLoading={loading} />
      </View>
    </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, borderBottomWidth: 1, borderColor: COLORS.border || '#F0F0F0' },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A' },
  formSection: { padding: 20 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text?.primary || '#333', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: COLORS.surface || '#F8F9FA', borderWidth: 1, borderColor: COLORS.border || '#E0E0E0', borderRadius: 12, padding: 16, fontSize: 15, color: COLORS.text?.primary || '#1A1A1A' },
  textArea: { height: 100, textAlignVertical: 'top' },
  privacyContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.surface || '#F8F9FA', padding: 16, borderRadius: 12, marginTop: 30, borderWidth: 1, borderColor: COLORS.border || '#E0E0E0' },
  privacyTextContainer: { flex: 1, marginRight: 16 },
  privacyTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A' },
  privacyDesc: { fontSize: 12, color: COLORS.text?.secondary || '#666', marginTop: 4, lineHeight: 18 },
  footer: { padding: 20, paddingBottom: 40 }
});