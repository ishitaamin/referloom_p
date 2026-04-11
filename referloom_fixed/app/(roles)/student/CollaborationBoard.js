import React from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenWrapper from '../../../src/components/ui/ScreenWrapper';

const dummyPosts = [
  { id: "1", author: "Priya K.", type: "Hackathon", title: "Smart India Hackathon 2026", roles: ["Frontend Dev", "UI/UX Designer"], time: "2 hours ago" },
  { id: "2", author: "Rahul M.", type: "Project", title: "Building an AI-powered Code Reviewer", roles: ["Python Dev", "AI/ML Enthusiast"], time: "5 hours ago" },
];

export default function CollaborationBoard() {
  const router = useRouter();

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.authorRow}>
          <Image source={{ uri: `https://i.pravatar.cc/150?u=${item.author}` }} style={styles.avatar} />
          <View>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.badge}><Text style={styles.badgeText}>{item.type}</Text></View>
      </View>
      
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.lookingFor}>Looking for:</Text>
      
      <View style={styles.rolesRow}>
        {item.roles.map((role, idx) => (
          <View key={idx} style={styles.roleTag}><Text style={styles.roleText}>{role}</Text></View>
        ))}
      </View>
      
      <TouchableOpacity style={styles.applyBtn}>
        <Text style={styles.applyBtnText}>Apply to Team</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenWrapper>
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-left" size={24} color="#221244" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Find Teammates</Text>
        <TouchableOpacity><Feather name="edit" size={22} color="#3EB489" /></TouchableOpacity>
      </View>

      <FlatList
        data={dummyPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f2f4f8" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, backgroundColor: "#fff" },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#221244" },
  
  listContainer: { padding: 16 },
  postCard: { backgroundColor: "#fff", padding: 16, borderRadius: 16, marginBottom: 16, elevation: 2 },
  
  postHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  authorRow: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  author: { fontSize: 15, fontWeight: "700", color: "#221244" },
  time: { fontSize: 12, color: "#8a8f9b", marginTop: 2 },
  badge: { backgroundColor: "#E7F0FF", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: "#2B75FF", fontSize: 11, fontWeight: "700" },
  
  title: { fontSize: 16, fontWeight: "700", color: "#221244", marginBottom: 12 },
  lookingFor: { fontSize: 13, color: "#666", marginBottom: 8 },
  
  rolesRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  roleTag: { borderWidth: 1, borderColor: "#3EB489", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: "#F0FCF8" },
  roleText: { color: "#0B8A6E", fontSize: 12, fontWeight: "600" },
  
  applyBtn: { backgroundColor: "#f2f4f8", paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  applyBtnText: { color: "#221244", fontSize: 14, fontWeight: "700" },
});