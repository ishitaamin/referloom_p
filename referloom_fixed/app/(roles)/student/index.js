import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../src/context/AuthContext';
import { COLORS } from '../../../src/theme/colors';
import api from '../../../src/services/api';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function StudentDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [topMatch, setTopMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopMatch();
  }, []);

  const fetchTopMatch = async () => {
    try {
      // Fetch all matches from backend
      const response = await api.get('/jobs/matches');
      // Filter for roles with a 90% or higher fit score
      const highMatches = response.data.filter(job => job.fitScore >= 90);
      
      if (highMatches.length > 0) {
        setTopMatch(highMatches[0]); // Display the highest match
      }
    } catch (error) {
      console.error("Failed to load recommended job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.fullName?.split(' ')[0]} 👋</Text>
          <Text style={styles.subtext}>Ready to build your career?</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(roles)/student/StudentProfileScreen')}>
          <View style={styles.avatarPlaceholder}>
            <Feather name="user" size={24} color={COLORS.primary} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Actions Grid */}
      <View style={styles.actionsGrid}>
        <ActionCard 
          icon="upload-cloud" 
          title="Upload Project" 
          color="#4CAF50"
          onPress={() => router.push('/(roles)/student/UploadProjectScreen')} 
        />
        <ActionCard 
          icon="users" 
          title="Find Mentor" 
          color="#FF9800"
          onPress={() => router.push('/(roles)/student/MentorshipRequestScreen')} 
        />
        <ActionCard 
          icon="briefcase" 
          title="Job Matches" 
          color="#2196F3"
          onPress={() => router.push('/(roles)/student/JobMatchScreen')} 
        />
        <ActionCard 
          icon="message-circle" 
          title="Collab Board" 
          color="#9C27B0"
          onPress={() => router.push('/(roles)/student/CollaborationBoard')} 
        />
      </View>

      {/* Visibility Status Banner */}
      <View style={[styles.visibilityBanner, { backgroundColor: user?.visibilityMode === 'public' ? '#4CAF50' : COLORS.primary }]}>
        <MaterialCommunityIcons 
          name={user?.visibilityMode === 'public' ? "eye-outline" : "shield-lock-outline"} 
          size={24} 
          color="#FFF" 
        />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>
            Profile is {user?.visibilityMode || 'Private'}
          </Text>
          <Text style={styles.bannerSub}>
            {user?.visibilityMode === 'public' 
              ? "Visible to all verified alumni and recruiters." 
              : "Hidden from peers. Recruiters need your permission."}
          </Text>
        </View>
        <TouchableOpacity style={styles.bannerBtn} onPress={() => router.push('/(roles)/student/EditProfile')}>
          <Text style={styles.bannerBtnText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* High Compatibility Role Section */}
      <Text style={styles.sectionTitle}>High Compatibility Role </Text>
      
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.primary} style={{ marginTop: 20 }} />
      ) : topMatch ? (
        <View style={styles.feedCard}>
          <View style={styles.badgeRow}>
             <Text style={styles.fitBadge}>{topMatch.fitScore}% AI MATCH</Text>
          </View>
          <Text style={styles.feedCardTitle}>{topMatch.title}</Text>
          <Text style={styles.feedCardSub}>{topMatch.companyName || topMatch.company} • {topMatch.location}</Text>
          
          <TouchableOpacity 
            style={styles.applyBtn} 
            onPress={() => router.push({
              pathname: '/(roles)/student/JobDetailScreen',
              params: { jobId: topMatch._id }
            })}
          >
            <Text style={styles.applyBtnText}>View Details & Apply</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No 90%+ matches today. Upload more projects to improve your score!</Text>
        </View>
      )}
    </ScrollView>
    </ScreenWrapper>
  );
}

const ActionCard = ({ icon, title, color, onPress }) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress}>
    <View style={[styles.iconWrapper, { backgroundColor: color + '20' }]}>
      <Feather name={icon} size={28} color={color} />
    </View>
    <Text style={styles.actionTitle}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || '#F8F9FA', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 30 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A' },
  subtext: { fontSize: 14, color: COLORS.text?.secondary || '#666', marginTop: 4 },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.surface || '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 30 },
  actionCard: { width: '48%', backgroundColor: COLORS.surface || '#FFF', padding: 16, borderRadius: 16, alignItems: 'center', marginBottom: 15, elevation: 1 },
  iconWrapper: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  actionTitle: { fontSize: 14, fontWeight: '600', color: COLORS.text?.primary || '#333' },
  visibilityBanner: { flexDirection: 'row', padding: 16, borderRadius: 16, alignItems: 'center', marginBottom: 30 },
  bannerTextContainer: { flex: 1, marginLeft: 12 },
  bannerTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  bannerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 },
  bannerBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  bannerBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A', marginBottom: 15 },
  feedCard: { backgroundColor: COLORS.surface || '#FFF', padding: 20, borderRadius: 16, elevation: 1, marginBottom: 20 },
  feedCardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text?.primary || '#333' },
  feedCardSub: { fontSize: 14, color: COLORS.text?.secondary || '#666', marginTop: 4, marginBottom: 15 },
  applyBtn: { backgroundColor: COLORS.primary || '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center' },
  applyBtnText: { color: '#FFF', fontWeight: 'bold' },
  fitBadge: { backgroundColor: '#E8F5E9', color: '#2E7D32', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, fontSize: 10, fontWeight: '900', alignSelf: 'flex-start', marginBottom: 8, overflow: 'hidden' },
  emptyCard: { padding: 30, backgroundColor: COLORS.surface || '#FFF', borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, borderStyle: 'dashed' },
  emptyText: { color: COLORS.text?.secondary || '#888', textAlign: 'center', fontSize: 14, lineHeight: 20 }
});