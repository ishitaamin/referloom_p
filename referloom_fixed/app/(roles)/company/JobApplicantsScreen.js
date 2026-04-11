// referloom_frontend/app/(roles)/company/JobApplicantsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../src/theme/colors';
import api from '../../../src/services/api';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function JobApplicantsScreen() {
  const router = useRouter();
  const { jobId, jobTitle } = useLocalSearchParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      // Backend should return applicants populated with student profile, fitScore, and referral status
      const response = await api.get(`/jobs/${jobId}/applicants`);
      
      // Client-side sort: Referrals first, then by Fit Score descending
      const sortedData = response.data.sort((a, b) => {
        if (a.isReferred && !b.isReferred) return -1;
        if (!a.isReferred && b.isReferred) return 1;
        return b.fitScore - a.fitScore;
      });

      setApplicants(sortedData);
    } catch (error) {
      console.error("Failed to fetch applicants", error);
    } finally {
      setLoading(false);
    }
  };

  const renderApplicantCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, item.isReferred && styles.referredCard]}
      onPress={() => {
        // Since the student applied, the company has access to view their full profile
        router.push({
          pathname: '/(roles)/company/CandidateDiscoveryScreen', // Reusing Discovery screen as Profile Viewer
          params: { studentId: item.studentId }
        });
      }}
    >
      {item.isReferred && (
        <View style={styles.referralBanner}>
          <MaterialCommunityIcons name="star-shooting" size={14} color="#FFF" />
          <Text style={styles.referralText}>Referred by {item.referredByName}</Text>
        </View>
      )}

      <View style={styles.cardBody}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.studentName?.charAt(0)}</Text>
        </View>
        
        <View style={styles.info}>
          <Text style={styles.name}>{item.studentName}</Text>
          <Text style={styles.course}>{item.course} • Sem {item.semester}</Text>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Fit Score</Text>
          <Text style={[styles.scoreValue, { color: item.fitScore >= 80 ? '#4CAF50' : '#FF9800' }]}>
            {item.fitScore}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-left" size={24} color={COLORS.text?.primary} /></TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerTitle}>Applicants</Text>
          <Text style={styles.jobTitleSub}>{jobTitle}</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList 
          data={applicants}
          keyExtractor={(item) => item._id}
          renderItem={renderApplicantCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Feather name="users" size={48} color={COLORS.border} />
              <Text style={styles.emptyText}>No applicants for this role yet.</Text>
            </View>
          }
        />
      )}
    </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: COLORS.border },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text?.primary },
  jobTitleSub: { fontSize: 12, color: COLORS.primary, marginTop: 2 },
  listContent: { padding: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 16, marginBottom: 16, elevation: 1, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden' },
  referredCard: { borderColor: '#FF9800', borderWidth: 2 },
  referralBanner: { backgroundColor: '#FF9800', paddingVertical: 4, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' },
  referralText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginLeft: 6 },
  cardBody: { padding: 16, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  info: { flex: 1, marginLeft: 16 },
  name: { fontSize: 16, fontWeight: 'bold', color: COLORS.text?.primary },
  course: { fontSize: 13, color: COLORS.text?.secondary, marginTop: 4 },
  scoreContainer: { alignItems: 'flex-end' },
  scoreLabel: { fontSize: 10, color: COLORS.text?.secondary, textTransform: 'uppercase', fontWeight: 'bold' },
  scoreValue: { fontSize: 20, fontWeight: '900', marginTop: 2 },
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: COLORS.text?.secondary, marginTop: 16 }
});