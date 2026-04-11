// referloom_frontend/app/(roles)/student/UploadProjectScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message'; // Added for Step 3
import { COLORS } from '../../../src/theme/colors';
import PrimaryButton from '../../../src/components/ui/PrimaryButton';
import api from '../../../src/services/api';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function UploadProjectScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    tags: '',
    githubUrl: '', // New field
    demoUrl: '',   // New field
  });

  const handleUpload = async () => {
    if (!form.title || !form.description) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Title and description are required.',
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        tags: form.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
        githubUrl: form.githubUrl,
        demoUrl: form.demoUrl,
      };

      await api.post('/projects', payload);
      
      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Project uploaded successfully.',
      });
      
      setTimeout(() => router.back(), 1500); // Wait for toast before navigating
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Upload Failed',
        text2: error.response?.data?.message || "Failed to upload project",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={COLORS.text?.primary || '#333'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Project</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.formSection} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imageUploadBtn}>
          <Feather name="image" size={32} color={COLORS.primary || '#007AFF'} />
          <Text style={styles.imageUploadText}>Add Project Thumbnail (Optional)</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Project Title *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g., Referloom Platform"
          value={form.title}
          onChangeText={(t) => setForm({...form, title: t})}
        />

        <Text style={styles.label}>Description *</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="What problem does it solve? What was your role?"
          value={form.description}
          onChangeText={(t) => setForm({...form, description: t})}
          multiline
        />

        <Text style={styles.label}>Tech Stack / Tags (Comma Separated)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g., React Native, Node.js, UI/UX"
          value={form.tags}
          onChangeText={(t) => setForm({...form, tags: t})}
        />

        {/* New GitHub URL Field */}
        <Text style={styles.label}>GitHub Repository URL</Text>
        <TextInput 
          style={styles.input} 
          placeholder="https://github.com/yourusername/repo"
          value={form.githubUrl}
          onChangeText={(t) => setForm({...form, githubUrl: t})}
          autoCapitalize="none"
          keyboardType="url"
        />

        {/* New Live Demo URL Field */}
        <Text style={styles.label}>Live Demo URL (Optional)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="https://yourproject.com"
          value={form.demoUrl}
          onChangeText={(t) => setForm({...form, demoUrl: t})}
          autoCapitalize="none"
          keyboardType="url"
        />
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton title="Publish Project" onPress={handleUpload} isLoading={loading} />
      </View>
    </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, borderBottomWidth: 1, borderColor: COLORS.border || '#F0F0F0' },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A' },
  formSection: { padding: 20 },
  imageUploadBtn: { height: 120, backgroundColor: '#F0F4F8', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#D9E2EC', borderStyle: 'dashed' },
  imageUploadText: { color: COLORS.primary || '#007AFF', marginTop: 8, fontWeight: '600' },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text?.primary || '#333', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: COLORS.surface || '#F8F9FA', borderWidth: 1, borderColor: COLORS.border || '#E0E0E0', borderRadius: 12, padding: 16, fontSize: 15 },
  textArea: { height: 120, textAlignVertical: 'top' },
  footer: { padding: 20, paddingBottom: 40, borderTopWidth: 1, borderColor: COLORS.border || '#F0F0F0', backgroundColor: '#FFF' }
});