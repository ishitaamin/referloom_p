// referloom_frontend/app/(roles)/alumni/ViewStudentProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../src/theme/colors';
import PrimaryButton from '../../../src/components/ui/PrimaryButton';
import api from '../../../src/services/api';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function ViewStudentProfileScreen() {
  const router = useRouter();
  const { studentId } = useLocalSearchParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentProfile();
  }, [studentId]);

  const fetchStudentProfile = async () => {
    try {
      const response = await api.get(`/users/${studentId}`);
      setStudent(response.data);
    } catch (error) {
      console.error("Failed to fetch student", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefer = async () => {
    try {
      // In reality, this might open a modal to select WHICH job to refer them to
      await api.post(`/referrals/refer`, { studentId });
      alert("Candidate successfully referred to your company!");
    } catch (error) {
      alert("Failed to refer candidate.");
    }
  };

  if (loading || !student) return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={24} color={COLORS.text?.primary || '#1A1A1A'} />
          </TouchableOpacity>
        </View>

        <View style={styles.identityCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{student.fullName?.charAt(0)}</Text></View>
          <Text style={styles.name}>{student.fullName}</Text>
          <Text style={styles.headline}>{student.headline}</Text>
          <Text style={styles.course}>{student.student?.course} • Sem {student.student?.semester}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{student.bio || "No bio provided."}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsRow}>
            {student.skills?.map((skill, idx) => (
              <View key={idx} style={styles.skillBadge}><Text style={styles.skillText}>{skill}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* The Referral Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
          <Feather name="message-circle" size={20} color={COLORS.primary || '#007AFF'} style={{ marginRight: 8 }} />
          <Text style={styles.secondaryBtnText}>Message</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <PrimaryButton title="Refer Candidate" onPress={handleRefer} />
        </View>
      </View>
    </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingBottom: 100 },
  headerNav: { padding: 20, paddingTop: 40 },
  identityCard: { alignItems: 'center', paddingHorizontal: 20, marginBottom: 24 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.primary || '#007AFF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { fontSize: 40, color: '#FFF', fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A' },
  headline: { fontSize: 16, color: COLORS.primary || '#007AFF', marginTop: 4, textAlign: 'center' },
  course: { fontSize: 14, color: COLORS.text?.secondary || '#666', marginTop: 8 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A', marginBottom: 12 },
  bio: { fontSize: 15, color: COLORS.text?.secondary || '#444', lineHeight: 24 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  skillBadge: { backgroundColor: '#F0F4F8', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginRight: 8, marginBottom: 8 },
  skillText: { fontSize: 14, color: '#334E68', fontWeight: '500' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 16, borderTopWidth: 1, borderColor: '#F0F0F0', elevation: 10 },
  secondaryBtn: { flexDirection: 'row', flex: 1, borderWidth: 1, borderColor: COLORS.primary || '#007AFF', borderRadius: 12, justifyContent: 'center', alignItems: 'center', height: 50 },
  secondaryBtnText: { color: COLORS.primary || '#007AFF', fontWeight: 'bold', fontSize: 15 }
});