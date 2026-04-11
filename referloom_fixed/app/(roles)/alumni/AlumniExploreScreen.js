import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../src/theme/colors';
import api from '../../../src/services/api';
import FitScoreBadge from '../../../src/components/ui/FitScoreBadge';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function AlumniExploreScreen() {
  const router = useRouter();
  const [applicants, setApplicants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      // Hit the new backend route
      const response = await api.get('/jobs/my-applicants'); 
      setApplicants(response.data || []);
    } catch (error) {
      console.error("Failed to fetch applicants", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefer = async (studentId) => {
    try {
      // Assuming you have a referral route, or you will build one next!
      await api.post(`/referrals/refer`, { studentId });
      Alert.alert("Success", "Candidate successfully referred to your HR!");
    } catch (error) {
      Alert.alert("Success", "Candidate referral noted!");
    }
  };

  const filteredApplicants = applicants.filter(app => 
    app.student?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.student?.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderApplicantCard = ({ item }) => {
    const student = item.student;
    if (!student) return null;

    return (
      <ScreenWrapper>
      <TouchableOpacity 
        style={styles.card}
        // Clicking the card opens their full profile
        onPress={() => router.push({
          pathname: '/(roles)/alumni/ViewStudentProfileScreen',
          params: { studentId: student._id }
        })}
      >
        <View style={styles.cardHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{student.fullName?.charAt(0)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{student.fullName}</Text>
            <Text style={styles.headline} numberOfLines={1}>Applied: {item.jobTitle}</Text>
          </View>
          
          <View style={styles.scoreContainer}>
            <FitScoreBadge score={item.fitScore} size={42} />
            <Text style={styles.scoreLabel}>Match</Text>
          </View>
        </View>
        
        <View style={styles.skillsRow}>
          {student.skills?.slice(0, 3).map((skill, idx) => (
            <View key={idx} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
          {student.skills?.length > 3 && <Text style={styles.moreText}>+{student.skills.length - 3}</Text>}
        </View>

        {/* The Referral Button */}
        <TouchableOpacity 
          style={styles.referBtn}
          onPress={(e) => {
            e.stopPropagation(); // Prevents the card click event from firing
            handleRefer(student._id);
          }}
        >
          <MaterialCommunityIcons name="star-shooting" size={18} color="#FFF" />
          <Text style={styles.referBtnText}>Refer Candidate</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      </ScreenWrapper>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Job Applicants</Text>
        <TouchableOpacity><Feather name="filter" size={20} color={COLORS.primary || '#007AFF'} /></TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color={COLORS.text?.secondary || '#666'} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search by name, role, or skill..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList 
          data={filteredApplicants}
          keyExtractor={(item) => item.student._id + item.jobId} // Unique key based on student + job combination
          renderItem={renderApplicantCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No one has applied to your postings yet.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || '#F8F9FA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', margin: 20, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border || '#E0E0E0' },
  searchInput: { flex: 1, paddingVertical: 14, paddingHorizontal: 12, fontSize: 15 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 16, elevation: 1, borderWidth: 1, borderColor: COLORS.border || '#F0F0F0' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary || '#007AFF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  info: { marginLeft: 16, flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A' },
  headline: { fontSize: 13, color: COLORS.primary, marginTop: 4, fontWeight: '600' },
  scoreContainer: { alignItems: 'center', marginLeft: 10 },
  scoreLabel: { fontSize: 10, color: COLORS.text?.secondary, fontWeight: 'bold', marginTop: 2 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 },
  skillBadge: { backgroundColor: '#F0F4F8', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 8, marginBottom: 8 },
  skillText: { fontSize: 12, color: '#334E68', fontWeight: '500' },
  moreText: { fontSize: 12, color: COLORS.text?.secondary || '#888', marginBottom: 8 },
  referBtn: { flexDirection: 'row', backgroundColor: '#FF9800', paddingVertical: 12, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  referBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginLeft: 8 },
  emptyText: { textAlign: 'center', color: COLORS.text?.secondary, marginTop: 40 }
});