import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import api from '../../../src/services/api';
import FitScoreBadge from '../../../src/components/ui/FitScoreBadge';
import { COLORS } from '../../../src/theme/colors';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function JobMatchScreen() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await api.get('/jobs/matches');
        setJobs(response.data); 
      } catch (error) {
        console.error("Failed to load jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const renderJobCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.jobCard} 
      onPress={() => router.push({ pathname: '/(roles)/student/JobDetailScreen', params: { jobId: item._id } })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.companyInfo}>
          {/* 1. Job Title / Position */}
          <Text style={styles.jobTitle}>{item.title}</Text>
          
          {/* 2. Company Name & Location (Updated to item.companyName) */}
          <Text style={styles.companyName}>{item.companyName} • {item.location}</Text>
          
          {/* 3. Job Type Badge (Updated to item.jobType) */}
          <View style={styles.jobTypeBadge}>
            <Feather name="briefcase" size={12} color={COLORS.primary} />
            <Text style={styles.jobTypeText}>{item.jobType}</Text>
          </View>
        </View>

        {/* 4. Fit Score */}
        <View style={styles.scoreContainer}>
          <FitScoreBadge score={item.fitScore} size={50} />
          <Text style={styles.scoreLabel}>Fit Score</Text>
        </View>
      </View>
      
      <View style={styles.tagsContainer}>
        {/* Updated to use item.requirements instead of requiredSkills */}
        {item.requirements?.slice(0, 3).map((skill, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{skill}</Text>
          </View>
        ))}
        {item.requirements?.length > 3 && (
          <Text style={styles.moreTags}>+{item.requirements.length - 3}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Matched Roles</Text>
        <Text style={styles.headerSubtitle}>Based on your verified projects</Text>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item._id}
        renderItem={renderJobCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No jobs found. Upload more projects to get matches!</Text>
        }
      />
    </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, paddingTop: 40, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: COLORS.border },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text.primary },
  headerSubtitle: { fontSize: 14, color: COLORS.text.secondary, marginTop: 4 },
  listContainer: { padding: 16 },
  jobCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  companyInfo: { flex: 1, marginRight: 12 },
  jobTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text.primary },
  companyName: { fontSize: 14, fontWeight: '600', color: COLORS.text.secondary, marginTop: 4 },
  jobTypeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E3F2FD', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginTop: 8 },
  jobTypeText: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginLeft: 4 },
  scoreContainer: { alignItems: 'center' },
  scoreLabel: { fontSize: 10, color: COLORS.text.secondary, marginTop: 4, fontWeight: 'bold' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, alignItems: 'center' },
  tag: { backgroundColor: COLORS.surface, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginRight: 8, marginBottom: 8 },
  tagText: { fontSize: 12, color: COLORS.text.secondary },
  moreTags: { fontSize: 12, color: COLORS.text.secondary, marginBottom: 8 },
  emptyText: { textAlign: 'center', color: COLORS.text.secondary, marginTop: 40 }
});