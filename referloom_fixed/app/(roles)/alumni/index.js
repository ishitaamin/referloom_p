import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

export default function AlumniProfileScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper>
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-left" size={24} color="#221244" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Alumni Profile</Text>
        
        {/* ✅ WIRED UP EDIT BUTTON */}
        <TouchableOpacity onPress={() => router.push('/(roles)/alumni/EditAlumniProfile')}>
          <Feather name="edit-2" size={22} color="#3EB489" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topSection}>
          <Image source={{ uri: "https://i.pravatar.cc/150?img=11" }} style={styles.avatar} />
          <Text style={styles.name}>Vidit Shah <Ionicons name="checkmark-circle" size={16} color="#3EB489" /></Text>
          <Text style={styles.role}>Product Manager @ Google</Text>
          <Text style={styles.gradYear}>Class of 2021</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>12</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>48</Text>
            <Text style={styles.statLabel}>Endorsements</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>3</Text>
            <Text style={styles.statLabel}>Referrals</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Journey</Text>
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineIcon}><Feather name="briefcase" size={14} color="#fff" /></View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineRole}>Product Manager</Text>
              <Text style={styles.timelineCompany}>Google • 2023 - Present</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={[styles.timelineIcon, {backgroundColor: "#A9A2B8"}]}><Feather name="briefcase" size={14} color="#fff" /></View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineRole}>Associate PM</Text>
              <Text style={styles.timelineCompany}>Amazon • 2021 - 2023</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#221244" },
  
  container: { paddingHorizontal: 20, paddingBottom: 40 },
  
  topSection: { alignItems: "center", marginTop: 10, paddingBottom: 24, borderBottomWidth: 1, borderColor: "#f2f4f8" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12, borderWidth: 3, borderColor: "#D4F8E8" },
  name: { fontSize: 22, fontWeight: "800", color: "#221244" },
  role: { fontSize: 15, color: "#221244", marginTop: 4, fontWeight: "600" },
  gradYear: { fontSize: 13, color: "#8a8f9b", marginTop: 4 },

  statsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 24, marginBottom: 24 },
  statBox: { flex: 1, alignItems: "center", backgroundColor: "#f2f4f8", paddingVertical: 16, borderRadius: 16, marginHorizontal: 4 },
  statNum: { fontSize: 22, fontWeight: "800", color: "#3EB489" },
  statLabel: { fontSize: 12, color: "#666", marginTop: 4, fontWeight: "600" },

  section: { marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#221244", marginBottom: 16 },
  
  timelineItem: { flexDirection: "row", marginBottom: 20 },
  timelineIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#2B75FF", alignItems: "center", justifyContent: "center", marginRight: 16, zIndex: 2 },
  timelineContent: { flex: 1, paddingTop: 4 },
  timelineRole: { fontSize: 15, fontWeight: "700", color: "#221244" },
  timelineCompany: { fontSize: 13, color: "#666", marginTop: 2 },
});