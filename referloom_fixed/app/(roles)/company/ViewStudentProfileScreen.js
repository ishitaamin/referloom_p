import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../src/theme/colors';
import PrimaryButton from '../../../src/components/ui/PrimaryButton';
import api from '../../../src/services/api';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function ViewStudentProfileScreen() {
  const router = useRouter();
  const { studentId, jobTitle, fitScore } = useLocalSearchParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/users/${studentId}`);
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    setConnecting(true);
    // Simulate API call to send connect request
    setTimeout(() => {
      setConnecting(false);
      Alert.alert("Request Sent!", "Your connection request has been sent to the candidate. You can track it in the Notifications tab.");
      router.back();
    }, 1500);
  };

  if (loading) return <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 60 }} />;

  return (
    <ScreenWrapper>
    <ScrollView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Candidate Overview</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{profile?.fullName?.charAt(0) || 'S'}</Text>
        </View>
        <Text style={styles.name}>{profile?.fullName}</Text>
        <Text style={styles.university}>{profile?.studentDetails?.university}</Text>
        
        <View style={styles.jobContextBadge}>
           <Text style={styles.jobContextText}>Applied for: {jobTitle} ({fitScore}% Match)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Skills</Text>
        <View style={styles.skillsContainer}>
          {profile?.studentDetails?.skills?.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          title="Connect with Candidate" 
          onPress={handleConnect} 
          isLoading={connecting} 
        />
      </View>
    </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: COLORS.border },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  backBtn: { padding: 4 },
  header: { alignItems: 'center', padding: 30, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: COLORS.border },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { fontSize: 32, color: '#FFF', fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold', color: COLORS.text.primary },
  university: { fontSize: 16, color: COLORS.text.secondary, marginTop: 4 },
  jobContextBadge: { backgroundColor: '#FFF3E0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginTop: 12, borderWidth: 1, borderColor: '#FFE0B2' },
  jobContextText: { color: '#FF9800', fontWeight: 'bold', fontSize: 13 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillBadge: { backgroundColor: '#E3F2FD', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  skillText: { color: '#1976D2', fontWeight: '600' },
  footer: { padding: 20, marginTop: 20 }
});