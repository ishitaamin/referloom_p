import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../src/context/AuthContext';
import api from '../../../src/services/api';
import { COLORS } from '../../../src/theme/colors';
import PrimaryButton from '../../../src/components/ui/PrimaryButton';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function StudentProfileScreen() {
  const router = useRouter();
  
  // Update this line to get the loading state from your AuthContext
  const { user, logout, isLoading: authLoading } = useAuth(); 
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFullProfile = async () => {
    try {
      // ✅ Supports both MongoDB `_id` and standard `id`
      const targetId = user?.id || user?._id; 
      
      const response = await api.get(`/users/${targetId}`);
      setProfile(response.data);
    } catch (error) {
      console.error("❌ Profile fetch error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
      setRefreshing(false); // ✅ Fixes infinite loading on pull-to-refresh
    }
  };

  useEffect(() => {
    // Only check once auth Context is finished loading
    if (!authLoading) {
      if (user?.id || user?._id) {
        fetchFullProfile();
      } else {
        // ✅ FAILSAFE: If no user ID is found, stop the infinite spinner
        console.error("❌ No user ID found to fetch profile!");
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFullProfile(); // ✅ Changed this to the correct function name!
  }, [user]);

  

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  return (
    <ScreenWrapper>
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{profile?.fullName?.charAt(0) || 'S'}</Text>
        </View>
        
        {/* --- EDIT PROFILE BUTTON & NAME ROW --- */}
        <View style={styles.nameRow}>
          <Text style={styles.name}>{profile?.fullName}</Text>
          <TouchableOpacity 
            style={styles.editBtn}
            onPress={() => router.push('/(roles)/student/EditProfile')}
          >
            <Feather name="edit-2" size={14} color={COLORS.primary} />
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.university}>
          {profile?.studentDetails?.course} • {profile?.studentDetails?.university}
        </Text>
        
        <View style={styles.visibilityBadge}>
          <Feather name={profile?.visibilityMode === 'public' ? 'eye' : 'eye-off'} size={14} color={COLORS.text.secondary} />
          <Text style={styles.visibilityText}>
            Profile is {profile?.visibilityMode === 'public' ? 'Public' : 'Private (Locked)'}
          </Text>
        </View>
      </View>

      {/* --- EXPERIENCE SECTION --- */}
      {/* --- EXPERIENCE SECTION --- */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Experience & Internships</Text>
          {/* Matches the 'plus' button style used in Projects */}
          <TouchableOpacity onPress={() => router.push('/(roles)/student/AddExperienceScreen')}>
            <Feather name="plus-circle" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        
        {profile?.studentDetails?.experience?.length > 0 ? (
          profile.studentDetails.experience.map((exp, index) => (
            <View key={index} style={styles.experienceCard}>
              <View style={styles.experienceHeader}>
                <View style={styles.experienceDot} />
                <View style={styles.experienceInfo}>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expDuration}>{exp.duration}</Text>
                </View>
              </View>
              {exp.description ? (
                <Text style={styles.expDescription}>{exp.description}</Text>
              ) : null}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No experience added yet.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Skills</Text>
        <View style={styles.skillsContainer}>
          {profile?.studentDetails?.skills?.length > 0 ? (
            profile.studentDetails.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No skills added yet.</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Verified Projects</Text>
          <TouchableOpacity onPress={() => router.push('/(roles)/student/UploadProjectScreen')}>
            <Feather name="plus-circle" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {profile?.projects?.length > 0 ? (
          profile.projects.map((project, index) => (
            // --- UPDATED CLICKABLE PROJECT CARD ---
            <TouchableOpacity 
              key={index} 
              style={styles.projectCard}
              onPress={() => router.push({ pathname: '/(roles)/student/StudentProjectScreen', params: { projectId: project._id } })}
            >
              <View style={styles.projectCardHeader}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Feather name="chevron-right" size={20} color={COLORS.text.secondary} />
              </View>
              
              <Text style={styles.projectTech} numberOfLines={1}>
                {project.tags?.join(' • ')}
              </Text>

              {project.demoUrl ? (
                <View style={styles.linkRow}>
                  <Feather name="external-link" size={14} color={COLORS.primary} />
                  <Text style={styles.linkText}>{project.demoUrl}</Text>
                </View>
              ) : project.githubUrl ? (
                <View style={styles.linkRow}>
                  <Feather name="github" size={14} color={COLORS.primary} />
                  <Text style={styles.linkText}>{project.githubUrl}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Projects replace resumes. Upload one to get noticed!</Text>
            <PrimaryButton 
              title="Add Project" 
              onPress={() => router.push('/(roles)/student/UploadProjectScreen')} 
              style={{marginTop: 10}}
            />
          </View>
        )}
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', padding: 24, borderBottomWidth: 1, borderColor: COLORS.border, backgroundColor: '#FFF' },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { fontSize: 32, color: '#FFF', fontWeight: 'bold' },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', color: COLORS.text.primary },
  editBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F4F8', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginLeft: 12 },
  editBtnText: { color: COLORS.primary, fontSize: 12, fontWeight: '600', marginLeft: 4 },
  university: { fontSize: 16, color: COLORS.text.secondary, marginTop: 4 },
  visibilityBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginTop: 12 },
  visibilityText: { marginLeft: 6, fontSize: 12, color: COLORS.text.secondary },
  section: { padding: 20 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text.primary, marginBottom: 12 },
  
  // Experience Styles
  experienceCard: { marginBottom: 16, paddingLeft: 8 },
  experienceHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  experienceDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary, marginTop: 6, marginRight: 12 },
  experienceInfo: { flex: 1 },
  expRole: { fontSize: 16, fontWeight: 'bold', color: COLORS.text.primary },
  expCompany: { fontSize: 14, fontWeight: '600', color: COLORS.text.secondary, marginTop: 2 },
  expDuration: { fontSize: 12, color: '#888', marginTop: 2 },
  expDescription: { fontSize: 14, color: COLORS.text.secondary, marginTop: 8, paddingLeft: 22, lineHeight: 20 },
  section: { padding: 20 },
  sectionHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: COLORS.text.primary 
  },
  // Skills
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillBadge: { backgroundColor: '#E3F2FD', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  skillText: { color: '#1976D2', fontWeight: '600' },
  
  // Project Cards
  projectCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border, elevation: 1 },
  projectCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  projectTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text.primary },
  projectTech: { fontSize: 13, color: '#666', marginTop: 6, fontWeight: '500' },
  linkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  linkText: { fontSize: 13, color: COLORS.primary, marginLeft: 6, flex: 1 },
  
  emptyCard: { backgroundColor: COLORS.surface, padding: 20, borderRadius: 12, alignItems: 'center' },
  emptyText: { color: COLORS.text.secondary, textAlign: 'center' },
  logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 20 },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }
});