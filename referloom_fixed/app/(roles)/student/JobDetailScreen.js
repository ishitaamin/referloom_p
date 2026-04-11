import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { COLORS } from '../../../src/theme/colors';
import PrimaryButton from '../../../src/components/ui/PrimaryButton';
import FitScoreBadge from '../../../src/components/ui/FitScoreBadge';
import api from '../../../src/services/api';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function JobDetailScreen() {
  const router = useRouter();
  const { jobId } = useLocalSearchParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Backend returns the full job document + custom AI suggestions for this student
        const response = await api.get(`/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Error loading job details' });
      } finally {
        setLoading(false);
      }
    };
    if (jobId) fetchJobDetails();
  }, [jobId]);

  const handleApply = async () => {
    setApplying(true);
    try {
      await api.post(`/jobs/${job._id}/apply`);
      Toast.show({
        type: 'success',
        text1: 'Application Sent!',
        text2: 'The recruiter now has full access to your profile.',
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Application Failed',
        text2: error.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading || !job) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  // Format the date
  const postedDate = new Date(job.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Role Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* --- 1. FULL JOB IDENTITY --- */}
        <View style={styles.jobHeader}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyName}>{job.companyName} • {job.location}</Text>
          
          {/* Meta Data Row: Job Type, Salary, Date */}
          <View style={styles.metaRow}>
            <View style={styles.metaBadge}>
              <Feather name="briefcase" size={14} color={COLORS.primary} />
              <Text style={styles.metaText}>{job.jobType}</Text>
            </View>
            
            {job.salaryRange && (
              <View style={[styles.metaBadge, { backgroundColor: '#E8F5E9' }]}>
                <Feather name="dollar-sign" size={14} color="#2E7D32" />
                <Text style={[styles.metaText, { color: '#2E7D32' }]}>{job.salaryRange}</Text>
              </View>
            )}

            <View style={styles.metaBadge}>
              <Feather name="clock" size={14} color={COLORS.text.secondary} />
              <Text style={[styles.metaText, { color: COLORS.text.secondary }]}>Posted {postedDate}</Text>
            </View>
          </View>
        </View>

        {/* --- 2. AI FIT SCORE ANALYSIS --- */}
        <View style={styles.aiSection}>
          <View style={styles.aiHeaderRow}>
            <FitScoreBadge score={job.fitScore} size={70} />
            <View style={styles.aiHeaderTextContainer}>
              <Text style={styles.aiTitle}>AI Fit Analysis</Text>
              <Text style={styles.aiSubtitle}>Based on your verified projects</Text>
            </View>
          </View>

          {job.aiSuggestions && job.aiSuggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>How to improve your match:</Text>
              {job.aiSuggestions.map((suggestion, index) => (
                <View key={index} style={styles.suggestionRow}>
                  <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="#FF9800" />
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* --- 3. FULL DESCRIPTION & REQUIREMENTS --- */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>About the Role</Text>
          <Text style={styles.description}>{job.description}</Text>
          
          <Text style={[styles.sectionTitle, {marginTop: 24}]}>Required Skills</Text>
          <View style={styles.tagsContainer}>
            {/* Make sure it uses job.requirements! */}
            {job.requirements?.map((skill, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton title="Apply Now & Unlock Profile" onPress={handleApply} isLoading={applying} />
      </View>
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
  jobHeader: { marginBottom: 24 },
  jobTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text.primary },
  companyName: { fontSize: 16, color: COLORS.text.secondary, marginTop: 4, fontWeight: '500' },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 8 },
  metaBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E3F2FD', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  metaText: { fontSize: 13, color: COLORS.primary, fontWeight: '600', marginLeft: 6 },
  aiSection: { backgroundColor: '#F4F8FE', padding: 20, borderRadius: 16, marginBottom: 24, borderWidth: 1, borderColor: '#D0E3FF' },
  aiHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  aiHeaderTextContainer: { marginLeft: 16, flex: 1 },
  aiTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A365D' },
  aiSubtitle: { fontSize: 13, color: '#4A5568', marginTop: 2 },
  suggestionsContainer: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  suggestionsTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.text.primary, marginBottom: 12 },
  suggestionRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  suggestionText: { flex: 1, fontSize: 14, color: COLORS.text.secondary, marginLeft: 8, lineHeight: 20 },
  detailsSection: { marginBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text.primary, marginBottom: 12 },
  description: { fontSize: 15, color: COLORS.text.secondary, lineHeight: 24 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: { backgroundColor: COLORS.surface, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginRight: 8, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  tagText: { fontSize: 14, color: COLORS.text.primary, fontWeight: '500' },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: COLORS.border }
});