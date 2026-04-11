// referloom_frontend/app/(auth)/RoleSelectScreen.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../src/theme/colors';
import ScreenWrapper from '../../src/components/ui/ScreenWrapper';

export default function RoleSelectScreen() {
  const router = useRouter();

  const roles = [
    { id: 'student', title: 'Student', desc: 'Find mentors, build projects, and get hired.', icon: 'school-outline', route: '/(auth)/SignupStudentScreen', color: '#4CAF50' },
    { id: 'alumni', title: 'Alumni', desc: 'Guide students and refer top talent to your company.', icon: 'account-tie-hat-outline', route: '/(auth)/SignupAlumniScreen', color: '#FF9800' },
    { id: 'company', title: 'Company / HR', desc: 'Hire pre-vetted campus talent using AI Fit Scores.', icon: 'domain', route: '/(auth)/SignupCompanyScreen', color: '#2196F3' }
  ];

  return (
    <ScreenWrapper>
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Join Referloom</Text>
        <Text style={styles.subtitle}>Choose how you want to use the platform.</Text>

        <View style={styles.cardsContainer}>
          {roles.map((role) => (
            <TouchableOpacity 
              key={role.id} 
              style={[styles.roleCard, { borderLeftColor: role.color }]}
              onPress={() => router.push(role.route)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconBox, { backgroundColor: role.color + '15' }]}>
                <MaterialCommunityIcons name={role.icon} size={28} color={role.color} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.roleTitle}>{role.title}</Text>
                <Text style={styles.roleDesc}>{role.desc}</Text>
              </View>
              <Feather name="chevron-right" size={20} color={COLORS.text?.secondary || '#ccc'} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/LoginScreen')}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background || '#F8F9FA' },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: '800', color: COLORS.text?.primary || '#1A1A1A', marginBottom: 8 },
  subtitle: { fontSize: 16, color: COLORS.text?.secondary || '#666', marginBottom: 40 },
  cardsContainer: { gap: 16 },
  roleCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 16, elevation: 2, borderLeftWidth: 4, borderWidth: 1, borderColor: '#F0F0F0' },
  iconBox: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  textContainer: { flex: 1 },
  roleTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A', marginBottom: 4 },
  roleDesc: { fontSize: 13, color: COLORS.text?.secondary || '#666', lineHeight: 18 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
  footerText: { color: COLORS.text?.secondary || '#666', fontSize: 15 },
  loginText: { color: COLORS.primary || '#007AFF', fontSize: 15, fontWeight: 'bold' }
});