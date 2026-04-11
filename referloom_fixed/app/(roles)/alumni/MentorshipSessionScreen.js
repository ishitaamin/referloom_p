import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { COLORS } from '../../../src/theme/colors';
import PrimaryButton from '../../../src/components/ui/PrimaryButton';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function MentorshipSessionScreen() {
  const router = useRouter();

  // Mock Requests
  const [requests, setRequests] = useState([
    { id: '1', studentName: 'Ishita', message: 'I am building an AI Agent in React Native and would love your guidance on architecture.', status: 'pending' },
    { id: '2', studentName: 'Dev', message: 'Can you review my resume for a backend role?', status: 'pending' },
  ]);

  const handleResponse = (id, response) => {
    // API Call: await api.put(`/mentorship/requests/${id}`, { status: response })
    setRequests(requests.filter(req => req.id !== id));
    alert(`Mentorship ${response}!`);
  };

  const renderRequest = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.studentName}</Text>
      <Text style={styles.message}>"{item.message}"</Text>
      
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.rejectBtn} onPress={() => handleResponse(item.id, 'rejected')}>
          <Text style={styles.rejectText}>Decline</Text>
        </TouchableOpacity>
        <PrimaryButton 
          title="Accept & Guide" 
          onPress={() => handleResponse(item.id, 'accepted')} 
          style={{ flex: 1, paddingVertical: 10 }} 
        />
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mentorship Requests</Text>
      </View>

      <FlatList 
        data={requests}
        keyExtractor={item => item.id}
        renderItem={renderRequest}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.emptyText}>You have no pending requests.</Text>}
      />
    </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, paddingTop: 60, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderColor: COLORS.border },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary },
  card: { backgroundColor: COLORS.surface, padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
  name: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 8 },
  message: { fontSize: 14, color: COLORS.text.secondary, fontStyle: 'italic', marginBottom: 16, lineHeight: 20 },
  actionRow: { flexDirection: 'row', gap: 12 },
  rejectBtn: { paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' },
  rejectText: { color: COLORS.error, fontWeight: 'bold', fontSize: 15 },
  emptyText: { textAlign: 'center', color: COLORS.text.secondary, marginTop: 40 }
});