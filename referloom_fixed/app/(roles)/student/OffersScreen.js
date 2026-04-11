import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../../src/theme/colors';
import FitScoreBadge from '../../../src/components/ui/FitScoreBadge';
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

// Mock Data
const mockCompanyOffers = [
  { id: 'c1', companyName: 'TechCorp Inc.', role: 'Frontend Developer Intern', fitScore: 94, message: 'Your recent React Native project caught our eye. We have an open role that matches your skills perfectly.', date: '2 hours ago', isReferral: false },
  { id: 'c2', companyName: 'Google', role: 'Software Engineer', fitScore: 88, message: 'Vidit Shah (Alumni) referred your profile to our recruiting team. We would love to chat!', date: '1 day ago', isReferral: true }
];

const mockAlumniOffers = [
  { id: 'a1', alumniName: 'Vidit Shah', company: 'Google', designation: 'Product Manager', message: 'I saw you are building an AI Agent. I built something similar last year and would love to help you optimize it.', date: '3 hours ago' }
];

export default function OffersScreen() {
  const [activeTab, setActiveTab] = useState('company'); 
  const [loading, setLoading] = useState(false);

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Direct Offers</Text>
        <Feather name="bell" size={20} color={COLORS.text.primary} />
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'company' && styles.activeTab]} onPress={() => setActiveTab('company')}>
          <Feather name="briefcase" size={16} color={activeTab === 'company' ? COLORS.primary : COLORS.text.secondary} style={{ marginRight: 6 }} />
          <Text style={[styles.tabText, activeTab === 'company' && styles.activeTabText]}>Company Invites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.tab, activeTab === 'alumni' && styles.activeTab]} onPress={() => setActiveTab('alumni')}>
          <Feather name="users" size={16} color={activeTab === 'alumni' ? COLORS.primary : COLORS.text.secondary} style={{ marginRight: 6 }} />
          <Text style={[styles.tabText, activeTab === 'alumni' && styles.activeTabText]}>Alumni Requests</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView style={styles.listContent} showsVerticalScrollIndicator={false}>
          {activeTab === 'company' ? (
            mockCompanyOffers.length > 0 ? mockCompanyOffers.map(offer => (
              <View key={offer.id} style={styles.card}>
                {offer.isReferral && (
                  <View style={styles.referralBanner}>
                    <MaterialCommunityIcons name="star-shooting" size={14} color="#FFF" />
                    <Text style={styles.referralText}>Alumni Referral</Text>
                  </View>
                )}
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.companyTitle}>{offer.companyName}</Text>
                    <Text style={styles.roleTitle}>{offer.role}</Text>
                  </View>
                  <View style={styles.scoreContainer}>
                    <FitScoreBadge score={offer.fitScore} size={50} />
                    <Text style={styles.scoreLabel}>Match</Text>
                  </View>
                </View>
                <View style={styles.messageBox}>
                  <Feather name="message-square" size={14} color={COLORS.text.secondary} style={{ marginTop: 2 }} />
                  <Text style={styles.messageText}>"{offer.message}"</Text>
                </View>
                <View style={styles.actionRow}>
                  <Text style={styles.timeText}>{offer.date}</Text>
                  <TouchableOpacity style={styles.acceptBtn} onPress={() => alert('Accepted!')}>
                    <Text style={styles.acceptBtnText}>Accept & Chat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No company invites yet.</Text>
              </View>
            )
          ) : (
            mockAlumniOffers.length > 0 ? mockAlumniOffers.map(offer => (
              <View key={offer.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.avatar}><Text style={styles.avatarText}>{offer.alumniName.charAt(0)}</Text></View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.companyTitle}>{offer.alumniName}</Text>
                    <Text style={styles.roleTitle}>{offer.designation} @ {offer.company}</Text>
                  </View>
                </View>
                <View style={styles.messageBox}>
                  <Feather name="message-square" size={14} color={COLORS.text.secondary} style={{ marginTop: 2 }} />
                  <Text style={styles.messageText}>"{offer.message}"</Text>
                </View>
                <View style={styles.actionRow}>
                  <Text style={styles.timeText}>{offer.date}</Text>
                  <TouchableOpacity style={[styles.acceptBtn, { backgroundColor: COLORS.primary }]} onPress={() => alert('Connected!')}>
                    <Text style={styles.acceptBtnText}>Connect</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No alumni connections yet.</Text>
              </View>
            )
          )}
        </ScrollView>
      )}
    </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text.primary },
  tabContainer: { flexDirection: 'row', backgroundColor: '#FFF', paddingHorizontal: 20, borderBottomWidth: 1, borderColor: COLORS.border },
  tab: { flex: 1, flexDirection: 'row', paddingVertical: 16, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: COLORS.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: COLORS.text.secondary },
  activeTabText: { color: COLORS.primary },
  listContent: { padding: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 16, marginBottom: 16, elevation: 1, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden' },
  referralBanner: { backgroundColor: '#FF9800', paddingVertical: 6, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' },
  referralText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginLeft: 6 },
  cardHeader: { flexDirection: 'row', padding: 16, alignItems: 'flex-start' },
  companyTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text.primary },
  roleTitle: { fontSize: 14, color: COLORS.primary, marginTop: 4, fontWeight: '600' },
  scoreContainer: { alignItems: 'center', marginLeft: 12 },
  scoreLabel: { fontSize: 10, color: COLORS.text.secondary, marginTop: 4, fontWeight: 'bold' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#1976D2' },
  messageBox: { flexDirection: 'row', backgroundColor: '#F8F9FA', marginHorizontal: 16, padding: 12, borderRadius: 10, marginBottom: 16 },
  messageText: { flex: 1, fontSize: 13, color: COLORS.text.secondary, marginLeft: 8, fontStyle: 'italic', lineHeight: 20 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 16 },
  timeText: { fontSize: 12, color: COLORS.text.secondary },
  acceptBtn: { backgroundColor: '#2196F3', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  acceptBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: COLORS.text.secondary, marginTop: 16, textAlign: 'center' }
});