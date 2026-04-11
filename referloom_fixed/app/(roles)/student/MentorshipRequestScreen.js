import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../src/theme/colors';
import PrimaryButton from '../../../src/components/ui/PrimaryButton';
import api from '../../../src/services/api';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function MentorshipRequestScreen() {
  const router = useRouter();
  const { alumniId, alumniName, company } = useLocalSearchParams(); 
  
  const isComposeMode = !!alumniId; 
  const [activeTab, setActiveTab] = useState('pending');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(!isComposeMode);
  
  const [reason, setReason] = useState(''); 
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const mentorshipReasons = [
    "Resume Reviewing",
    "Mock Interview",
    "Career Guidance",
    "Technical Skill Growth",
    "Referral Inquiry"
  ];

  useEffect(() => {
    if (!isComposeMode) fetchRequests();
  }, [isComposeMode]);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/mentorship/requests'); 
      if (Array.isArray(response.data)) {
        setRequests(response.data);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error("Failed to fetch requests", error);
      setRequests([]); 
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async () => {
    if (!reason) return Alert.alert("Required", "Please select a reason for mentorship.");
    if (!message.trim()) return Alert.alert("Required", "Please write a short message.");

    setSending(true);
    try {
      await api.post('/mentorship/request', {
        alumniId,
        message: `[${reason}] ${message}` 
      });
      Alert.alert("Success", "Request sent! Track status in the Mentorship Hub.");
      router.replace('/(roles)/student/MentorshipRequestScreen');
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to send request");
    } finally {
      setSending(false);
    }
  };

  if (isComposeMode) {
    return (
      <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="x" size={24} color={COLORS.text?.primary || '#1A1A1A'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Request Mentorship</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.targetCard}>
            <Text style={styles.targetTitle}>ALUMNI MENTOR</Text>
            <Text style={styles.targetName}>{alumniName}</Text>
            <Text style={styles.targetCompany}>{company}</Text>
          </View>

          <Text style={styles.label}>Primary Reason *</Text>
          <View style={styles.reasonsGrid}>
            {mentorshipReasons.map((item) => (
              <TouchableOpacity 
                key={item} 
                style={[styles.reasonChip, reason === item && styles.activeChip]}
                onPress={() => setReason(item)}
              >
                <Text style={[styles.reasonText, reason === item && styles.activeChipText]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Message for Alumni *</Text>
          <TextInput 
            style={styles.textArea}
            placeholder="Share context (e.g., 'I am applying for Frontend roles and need a resume review...')"
            multiline
            numberOfLines={5}
            value={message}
            onChangeText={setMessage}
          />
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton title="Ask for Mentorship" onPress={handleSendRequest} isLoading={sending} />
        </View>
      </View>
      </ScreenWrapper>
    );
  }

  const filteredRequests = requests.filter(r => r.status === activeTab);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={COLORS.text?.primary || '#1A1A1A'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mentorship Hub</Text>
        <TouchableOpacity onPress={() => router.push('/(roles)/student/StudentExploreScreen')}>
          <Feather name="search" size={24} color={COLORS.primary || '#007AFF'} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'pending' && styles.activeTab]} onPress={() => setActiveTab('pending')}>
          <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'accepted' && styles.activeTab]} onPress={() => setActiveTab('accepted')}>
          <Text style={[styles.tabText, activeTab === 'accepted' && styles.activeTabText]}>My Mentors</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView style={styles.listContent}>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((req) => (
              <View key={req._id} style={styles.requestCard}>
                <View style={styles.reqHeader}>
                  <Text style={styles.reqName}>{req.alumni?.fullName || "Unknown Alumni"}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: req.status === 'accepted' ? '#E8F5E9' : '#FFF3E0' }]}>
                    <Text style={[styles.statusText, { color: req.status === 'accepted' ? '#4CAF50' : '#FF9800' }]}>
                      {req.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={styles.reqCompany}>{req.alumni?.professionalDetails?.companyName || req.alumni?.alumni?.company || "Company info hidden"}</Text>
                
                {req.status === 'accepted' && (
                  <TouchableOpacity style={styles.chatBtn} onPress={() => router.push('/(roles)/student/StudentChatScreen')}>
                    <MaterialCommunityIcons name="message-text-outline" size={18} color="#FFF" style={{ marginRight: 8 }} />
                    <Text style={styles.chatBtnText}>Open Chat</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="clipboard-text-outline" size={48} color={COLORS.border || '#E0E0E0'} />
              <Text style={styles.emptyText}>No {activeTab} requests found.</Text>
              {activeTab === 'pending' && (
                <TouchableOpacity onPress={() => router.push('/(roles)/student/StudentExploreScreen')}>
                  <Text style={styles.findLink}>Find a Mentor</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || '#F8F9FA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: COLORS.border || '#F0F0F0' },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A' },
  content: { padding: 20 },
  targetCard: { backgroundColor: '#F4F8FE', padding: 20, borderRadius: 16, marginBottom: 24, borderWidth: 1, borderColor: '#D0E3FF' },
  targetTitle: { fontSize: 10, fontWeight: '900', color: COLORS.primary || '#007AFF', marginBottom: 8 },
  targetName: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
  targetCompany: { fontSize: 14, color: COLORS.text?.secondary || '#666', marginTop: 4 },
  label: { fontSize: 14, fontWeight: 'bold', color: COLORS.text?.primary || '#333', marginBottom: 12, marginTop: 10 },
  reasonsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  reasonChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border || '#E0E0E0', backgroundColor: '#FFF' },
  activeChip: { backgroundColor: COLORS.primary || '#007AFF', borderColor: COLORS.primary || '#007AFF' },
  reasonText: { fontSize: 13, color: COLORS.text?.secondary || '#666' },
  activeChipText: { color: '#FFF', fontWeight: 'bold' },
  textArea: { backgroundColor: '#FFF', borderWidth: 1, borderColor: COLORS.border || '#E0E0E0', borderRadius: 12, padding: 15, fontSize: 15, textAlignVertical: 'top', height: 120 },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: COLORS.border || '#F0F0F0' },
  tabContainer: { flexDirection: 'row', backgroundColor: '#FFF', paddingHorizontal: 20, borderBottomWidth: 1, borderColor: COLORS.border || '#F0F0F0' },
  tab: { flex: 1, paddingVertical: 16, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: COLORS.primary || '#007AFF' },
  tabText: { fontSize: 15, fontWeight: '600', color: COLORS.text?.secondary || '#888' },
  activeTabText: { color: COLORS.primary || '#007AFF' },
  listContent: { padding: 20 },
  requestCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 16, elevation: 1, borderWidth: 1, borderColor: COLORS.border || '#F0F0F0' },
  reqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  reqName: { fontSize: 16, fontWeight: 'bold', color: COLORS.text?.primary || '#1A1A1A' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  reqCompany: { fontSize: 14, color: COLORS.text?.secondary || '#666', marginBottom: 16 },
  chatBtn: { flexDirection: 'row', backgroundColor: COLORS.primary || '#007AFF', paddingVertical: 10, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  chatBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: COLORS.text?.secondary || '#888', fontSize: 16, marginTop: 16 },
  findLink: { color: COLORS.primary || '#007AFF', fontSize: 16, fontWeight: 'bold', marginTop: 8 }
});