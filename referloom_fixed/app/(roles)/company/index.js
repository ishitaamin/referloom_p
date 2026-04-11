// referloom_frontend/app/(roles)/company/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../src/context/AuthContext';
import { COLORS } from '../../../src/theme/colors';
import api from '../../../src/services/api';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function CompanyDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      // Fetch jobs posted by this specific company
      const response = await api.get('/jobs/my-postings');
      setJobs(response.data || []);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const renderJobCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.jobCard}
      onPress={() => router.push({
        pathname: '/(roles)/company/JobApplicantsScreen',
        params: { jobId: item._id, jobTitle: item.title }
      })}
    >
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Active</Text>
        </View>
      </View>
      
      <Text style={styles.jobMeta}>{item.type} • {item.location}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Feather name="users" size={16} color={COLORS.primary} />
          <Text style={styles.statValue}>{item.applicantCount || 0} Applicants</Text>
        </View>
        <View style={styles.statBox}>
          <MaterialCommunityIcons name="star-shooting-outline" size={16} color="#FF9800" />
          <Text style={styles.statValue}>{item.referralCount || 0} Referrals</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome, {user?.company?.companyName}</Text>
          <Text style={styles.subGreeting}>Here is your talent pipeline overview.</Text>
        </View>
        {/* ✅ ADDED onPress TO ROUTE TO PROFILE */}
        <TouchableOpacity 
          style={styles.avatar} 
          onPress={() => router.push('/(roles)/company/CompanyProfileScreen')}
        >
          <Text style={styles.avatarText}>{user?.company?.companyName?.charAt(0) || 'C'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Postings</Text>
        <TouchableOpacity onPress={() => router.push('/(roles)/company/PostJobScreen')} style={styles.postBtn}>
          <Feather name="plus" size={16} color="#FFF" />
          <Text style={styles.postBtnText}>Post Job</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList 
          data={jobs}
          keyExtractor={(item) => item._id}
          renderItem={renderJobCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="briefcase-outline" size={48} color={COLORS.border} />
              <Text style={styles.emptyText}>You haven't posted any jobs yet.</Text>
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
  greeting: { fontSize: 20, fontWeight: 'bold', color: COLORS.text?.primary },
  subGreeting: { fontSize: 14, color: COLORS.text?.secondary, marginTop: 4 },
  avatar: { width: 44, height: 44, borderRadius: 8, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 20, fontWeight: 'bold', color: '#1976D2' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text?.primary },
  postBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, alignItems: 'center' },
  postBtnText: { color: '#FFF', fontWeight: 'bold', marginLeft: 6, fontSize: 13 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  jobCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 16, elevation: 1, borderWidth: 1, borderColor: COLORS.border },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  jobTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text?.primary, flex: 1 },
  statusBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#4CAF50', fontSize: 12, fontWeight: 'bold' },
  jobMeta: { fontSize: 14, color: COLORS.text?.secondary, marginBottom: 16 },
  statsRow: { flexDirection: 'row', borderTopWidth: 1, borderColor: COLORS.border, paddingTop: 12 },
  statBox: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  statValue: { fontSize: 14, fontWeight: '600', color: COLORS.text?.primary, marginLeft: 6 },
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: COLORS.text?.secondary, marginTop: 16 }
});