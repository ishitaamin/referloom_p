import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../../src/theme/colors';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

const MOCK_NOTIFICATIONS = [
  { id: '1', name: 'Ayush Sharma', role: 'Frontend Developer Intern', status: 'Pending', time: '2 hours ago' },
  { id: '2', name: 'Riya Patel', role: 'Data Analyst', status: 'Accepted', time: '1 day ago' },
];

export default function CompanyNotificationsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name={item.status === 'Accepted' ? 'check-circle' : 'clock'} size={20} color={item.status === 'Accepted' ? '#4CAF50' : '#FF9800'} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.message}>
          <Text style={styles.bold}>{item.name}</Text> {item.status === 'Accepted' ? 'accepted your connection request!' : 'has a pending connection request for'} <Text style={styles.bold}>{item.role}</Text>.
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      {item.status === 'Accepted' && (
        <TouchableOpacity style={styles.chatBtn}>
          <MaterialCommunityIcons name="message-text-outline" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Connect Requests</Text>
      </View>
      <FlatList 
        data={MOCK_NOTIFICATIONS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, paddingTop: 60, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: COLORS.border },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  list: { padding: 20 },
  card: { flexDirection: 'row', backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  textContainer: { flex: 1 },
  message: { fontSize: 14, color: COLORS.text.primary, lineHeight: 20 },
  bold: { fontWeight: 'bold' },
  time: { fontSize: 12, color: COLORS.text.secondary, marginTop: 4 },
  chatBtn: { padding: 8, backgroundColor: '#E3F2FD', borderRadius: 8, marginLeft: 12 }
});