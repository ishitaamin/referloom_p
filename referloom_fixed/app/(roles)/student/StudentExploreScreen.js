// referloom_frontend/app/(roles)/student/StudentExploreScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../src/theme/colors';
import api from '../../../src/services/api';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function StudentExploreScreen() {
  const router = useRouter();
  const [alumni, setAlumni] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      // Assuming backend has a route to fetch all public alumni
      const response = await api.get('/users?role=alumni'); 
      setAlumni(response.data || []);
    } catch (error) {
      console.error("Failed to fetch alumni", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAlumni = alumni.filter(a => 
    a.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.alumni?.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.alumni?.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAlumniCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.fullName?.charAt(0)}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.role}>{item.alumni?.role} @ {item.alumni?.company}</Text>
          <Text style={styles.gradYear}>Class of {item.alumni?.graduationYear}</Text>
        </View>
      </View>
      
      <View style={styles.skillsRow}>
        {item.skills?.slice(0, 3).map((skill, idx) => (
          <View key={idx} style={styles.skillBadge}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>

      {/* Route to the Request screen passing the specific Alumni ID */}
      // Inside your render function for Alumni in StudentExploreScreen.js
<TouchableOpacity 
  style={styles.alumniCard}
  onPress={() => router.push({
    pathname: '/(roles)/student/MentorshipRequestScreen',
    params: { 
      alumniId: item._id, 
      alumniName: item.fullName,
      company: item.professionalDetails?.companyName || 'Verified Alumni'
    }
  })}
>
  <View style={styles.alumniInfo}>
    <Text style={styles.alumniName}>{item.fullName}</Text>
    <Text style={styles.alumniDesignation}>
      {item.professionalDetails?.designation} at {item.professionalDetails?.companyName}
    </Text>
  </View>
  <Feather name="chevron-right" size={20} color={COLORS.primary} />
</TouchableOpacity>
    </View>
  );

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={COLORS.text?.primary || '#1A1A1A'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alumni Directory</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color={COLORS.text?.secondary || '#666'} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search by name, role, or company..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList 
          data={filteredAlumni}
          keyExtractor={(item) => item._id}
          renderItem={renderAlumniCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No alumni found matching your search.</Text>
            </View>
          }
        />
      )}
    </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || '#F8F9FA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, backgroundColor: '#FFF' },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', margin: 20, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border || '#E0E0E0' },
  searchInput: { flex: 1, paddingVertical: 14, paddingHorizontal: 12, fontSize: 15 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 16, elevation: 1, borderWidth: 1, borderColor: COLORS.border || '#F0F0F0' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary || '#007AFF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  info: { marginLeft: 16, flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A' },
  role: { fontSize: 14, color: COLORS.text?.secondary || '#666', marginTop: 2 },
  gradYear: { fontSize: 12, color: COLORS.primary || '#007AFF', marginTop: 2, fontWeight: '500' },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  skillBadge: { backgroundColor: '#F0F4F8', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 8, marginBottom: 8 },
  skillText: { fontSize: 12, color: '#334E68', fontWeight: '500' },
  requestBtn: { flexDirection: 'row', backgroundColor: COLORS.primary || '#007AFF', paddingVertical: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  requestBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyState: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: COLORS.text?.secondary || '#888' }
});