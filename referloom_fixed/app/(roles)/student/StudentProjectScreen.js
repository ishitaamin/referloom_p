import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../src/theme/colors';
import api from '../../../src/services/api';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function StudentProjectScreen() {
  const router = useRouter();
  const { projectId } = useLocalSearchParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("Failed to load project details", error);
      } finally {
        setLoading(false);
      }
    };
    if (projectId) fetchProject();
  }, [projectId]);

  const openLink = (url) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
  };

  if (loading || !project) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  // Format the upload date
  const dateUploaded = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'long', year: 'numeric'
  });

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Project Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Placeholder for an Image/Thumbnail if you add image uploads later */}
        <View style={styles.thumbnailPlaceholder}>
          <MaterialCommunityIcons name="application-braces-outline" size={60} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.date}>Uploaded {dateUploaded}</Text>

        {/* Action Buttons for Links */}
        <View style={styles.actionRow}>
          {project.githubUrl && (
            <TouchableOpacity style={styles.linkButton} onPress={() => openLink(project.githubUrl)}>
              <Feather name="github" size={18} color="#FFF" />
              <Text style={styles.linkButtonText}>View Code</Text>
            </TouchableOpacity>
          )}
          
          {project.demoUrl && (
            <TouchableOpacity style={[styles.linkButton, { backgroundColor: '#E3F2FD' }]} onPress={() => openLink(project.demoUrl)}>
              <Feather name="external-link" size={18} color={COLORS.primary} />
              <Text style={[styles.linkButtonText, { color: COLORS.primary }]}>Live Demo</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the Project</Text>
          <Text style={styles.description}>{project.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tech Stack</Text>
          <View style={styles.tagsContainer}>
            {project.tags?.map((tag, index) => (
              <View key={index} style={styles.tagBadge}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: COLORS.border },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text.primary },
  content: { padding: 20 },
  thumbnailPlaceholder: { width: '100%', height: 180, backgroundColor: '#F0F4F8', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#D9E2EC' },
  title: { fontSize: 26, fontWeight: 'bold', color: COLORS.text.primary },
  date: { fontSize: 14, color: COLORS.text.secondary, marginTop: 6 },
  actionRow: { flexDirection: 'row', marginTop: 24, gap: 12, paddingBottom: 24, borderBottomWidth: 1, borderColor: COLORS.border },
  linkButton: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#24292E', paddingVertical: 14, borderRadius: 12 },
  linkButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15, marginLeft: 8 },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text.primary, marginBottom: 12 },
  description: { fontSize: 15, color: COLORS.text.secondary, lineHeight: 24 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tagBadge: { backgroundColor: COLORS.surface, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border },
  tagText: { color: COLORS.text.primary, fontWeight: '500', fontSize: 14 }
});