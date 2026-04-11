import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../src/context/AuthContext';
import { COLORS } from '../../../src/theme/colors';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function CompanyProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <ScreenWrapper>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Company Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.profileHeader}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{user?.company?.companyName?.charAt(0) || 'C'}</Text>
        </View>
        <Text style={styles.companyName}>{user?.company?.companyName || 'Company Name'}</Text>
        <Text style={styles.hrName}>HR Rep: {user?.fullName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Company</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Feather name="globe" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>{user?.company?.website || 'No website added'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Feather name="map-pin" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>{user?.company?.location || 'Headquarters location not set'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Feather name="briefcase" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>Industry: {user?.company?.industry || 'Technology'}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Feather name="log-out" size={20} color="#FF3B30" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: COLORS.border },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text.primary },
  backBtn: { padding: 4 },
  profileHeader: { alignItems: 'center', padding: 30, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: COLORS.border },
  avatarPlaceholder: { width: 90, height: 90, borderRadius: 16, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { fontSize: 40, fontWeight: 'bold', color: '#1976D2' },
  companyName: { fontSize: 24, fontWeight: 'bold', color: COLORS.text.primary, textAlign: 'center' },
  hrName: { fontSize: 16, color: COLORS.primary, marginTop: 8, fontWeight: '600' },
  email: { fontSize: 14, color: COLORS.text.secondary, marginTop: 4 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text.primary, marginBottom: 16 },
  infoCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  infoText: { fontSize: 15, color: COLORS.text.secondary, marginLeft: 12, flex: 1 },
  logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 10, marginHorizontal: 20, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#FFE5E5' },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }
});