import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

const dummyRequests = [
  { id: "1", student: "Ishita", purpose: "Resume Review for Data Science", status: "Pending", time: "2 hours ago", image: "https://i.pravatar.cc/150?img=32" },
  { id: "2", student: "Dev Parikh", purpose: "Code Review: MERN E-Commerce", status: "Upcoming", time: "Tomorrow, 4:00 PM", image: "https://i.pravatar.cc/150?img=12" },
];

export default function AlumniHomeScreen() {
  const router = useRouter();
  const [tab, setTab] = useState("Pending"); // Pending, Upcoming, Completed

  const filteredRequests = dummyRequests.filter(req => req.status === tab);

  const renderRequest = ({ item }) => (
    <View style={styles.requestCard}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={styles.infoWrap}>
          <Text style={styles.studentName}>{item.student}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <TouchableOpacity><Feather name="more-horizontal" size={20} color="#221244" /></TouchableOpacity>
      </View>
      
      <View style={styles.purposeBox}>
        <Text style={styles.purposeLabel}>Purpose of Mentorship:</Text>
        <Text style={styles.purposeText}>{item.purpose}</Text>
      </View>

      {item.status === "Pending" && (
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.declineBtn]}>
            <Text style={styles.declineText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.acceptBtn]}>
            <Text style={styles.acceptText}>Accept Request</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.status === "Upcoming" && (
        <TouchableOpacity 
          style={styles.completeBtn}
          onPress={() => router.push("/alumni/MentorshipSessionScreen")}
        >
          <Text style={styles.completeBtnText}>Complete Session & Give Feedback</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScreenWrapper>
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.logo}>Referloom</Text>
        <TouchableOpacity onPress={() => router.push("/alumni/AlumniProfileScreen")}>
          <Image source={{ uri: "https://i.pravatar.cc/150?img=11" }} style={styles.headerAvatar} />
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeBanner}>
        <Text style={styles.greeting}>Welcome back, Vidit!</Text>
        <Text style={styles.subGreeting}>You have 1 pending mentorship request.</Text>
      </View>

      <View style={styles.tabContainer}>
        {["Pending", "Upcoming", "Completed"].map((t) => (
          <TouchableOpacity 
            key={t} 
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequest}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No requests in this tab.</Text>}
      />
    </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f2f4f8" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, backgroundColor: "#fff" },
  logo: { fontSize: 24, fontWeight: "800", color: "#221244" },
  headerAvatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: "#D7E1FF" },
  
  welcomeBanner: { padding: 16, backgroundColor: "#fff", marginBottom: 10 },
  greeting: { fontSize: 22, fontWeight: "700", color: "#221244" },
  subGreeting: { fontSize: 14, color: "#666", marginTop: 4 },

  tabContainer: { flexDirection: "row", backgroundColor: "#fff", paddingHorizontal: 16, borderBottomWidth: 1, borderColor: "#e2e6f0", paddingBottom: 10 },
  tab: { flex: 1, alignItems: "center", paddingVertical: 10, borderBottomWidth: 2, borderColor: "transparent" },
  tabActive: { borderColor: "#3EB489" },
  tabText: { fontSize: 14, color: "#8a8f9b", fontWeight: "600" },
  tabTextActive: { color: "#3EB489", fontWeight: "700" },

  listContainer: { padding: 16 },
  requestCard: { backgroundColor: "#fff", padding: 16, borderRadius: 16, marginBottom: 16, elevation: 2 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  infoWrap: { flex: 1 },
  studentName: { fontSize: 16, fontWeight: "700", color: "#221244" },
  timeText: { fontSize: 12, color: "#8a8f9b", marginTop: 2 },
  
  purposeBox: { backgroundColor: "#f2f4f8", padding: 12, borderRadius: 10, marginBottom: 16 },
  purposeLabel: { fontSize: 12, fontWeight: "700", color: "#666", marginBottom: 4 },
  purposeText: { fontSize: 14, color: "#221244", fontWeight: "600" },

  actionRow: { flexDirection: "row", gap: 12 },
  actionBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  declineBtn: { backgroundColor: "#FFE5E5" },
  acceptBtn: { backgroundColor: "#3EB489" },
  declineText: { color: "#D8000C", fontWeight: "700" },
  acceptText: { color: "#fff", fontWeight: "700" },
  
  completeBtn: { backgroundColor: "#221244", paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  completeBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  
  emptyText: { textAlign: "center", color: "#8a8f9b", marginTop: 40, fontSize: 15 },
});