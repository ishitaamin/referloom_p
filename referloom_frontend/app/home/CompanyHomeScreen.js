// RecruiterHomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function RecruiterHomeScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Home");

  const matches = [
    { id: 1, name: "Olivia Chen", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: "Benjamin Carter", img: "https://randomuser.me/api/portraits/men/11.jpg" },
    { id: 3, name: "Sophia Rodriguez", img: "https://randomuser.me/api/portraits/women/22.jpg" },
    { id: 4, name: "Liam Goldberg", img: "https://randomuser.me/api/portraits/men/31.jpg" },
    { id: 5, name: "Ava Nguyen", img: "https://randomuser.me/api/portraits/women/12.jpg" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Referloom</Text>

        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={22} color="#221244" />

          <TouchableOpacity
            onPress={() => {
              // open profile or profile stack
              navigation.navigate("home/ProfileScreen");
            }}
            style={{ marginLeft: 12 }}
          >
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/women/10.jpg" }}
              style={styles.profileImg}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        {/* Title */}
        <Text style={styles.sectionTitle}>Today's Top Matches</Text>

        {/* MATCHES LIST */}
        {matches.map((item) => (
          <View key={item.id} style={styles.matchCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={{ uri: item.img }} style={styles.userImage} />
              <Text style={styles.userName}>{item.name}</Text>
            </View>

            <View style={styles.matchBadge}>
              <Text style={styles.matchBadgeText}>92%</Text>
            </View>
          </View>
        ))}

        {/* Projects Section */}
        <Text style={styles.sectionTitle}>Fresh projects in your domain</Text>

        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>AI-Powered Recruiting Platform</Text>
          <Text style={styles.projectSub}>By Tech Innovators Group</Text>
        </View>
      </ScrollView>

      {/* POST OPENING FAB (keeps above footer) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          // navigate to post opening screen (change route name if different)
          navigation.navigate("home/PostOpening");
        }}
      >
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.fabText}> Post Opening</Text>
      </TouchableOpacity>

      {/* FOOTER NAV */}
      <View style={styles.footerWrap}>
        <View style={styles.footer}>
          <FooterTab
            icon={<Ionicons name="home" size={20} color={activeTab === "Home" ? "#2B75FF" : "#8a8f9b"} />}
            label="Home"
            active={activeTab === "Home"}
            onPress={() => {
              setActiveTab("Home");
              navigation.navigate("home/CompanyHomeScreen");
            }}
          />

          <FooterTab
            icon={<Feather name="briefcase" size={18} color={activeTab === "Projects" ? "#2B75FF" : "#8a8f9b"} />}
            label="Projects"
            active={activeTab === "Projects"}
            onPress={() => {
              setActiveTab("Projects");
              navigation.navigate("home/CompanyProjectScreen");
            }}
          />

          <FooterTab
            icon={<Ionicons name="compass-outline" size={20} color={activeTab === "Explore" ? "#2B75FF" : "#8a8f9b"} />}
            label="Candidates"
            active={activeTab === "Explore"}
            onPress={() => {
              setActiveTab("Explore");
              navigation.navigate("home/CompanyExploreScreen");
            }}
          />

          <FooterTab
            icon={<Ionicons name="chatbubble-ellipses-outline" size={20} color={activeTab === "Chats" ? "#2B75FF" : "#8a8f9b"} />}
            label="Chats"
            active={activeTab === "Chats"}
            onPress={() => {
              setActiveTab("Chats");
              navigation.navigate("home/CompanyChatScreen");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

/* Footer tab component */
function FooterTab({ icon, label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.tabBtn} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.tabIconWrap, active && styles.tabActive]}>{icon}</View>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  logo: { fontSize: 20, fontWeight: "700", color: "#221244" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  profileImg: { width: 32, height: 32, borderRadius: 16 },

  /* Sections */
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 10,
    color: "#221244",
  },

  /* Match Cards */
  matchCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userImage: { width: 42, height: 42, borderRadius: 21 },
  userName: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },

  matchBadge: {
    backgroundColor: "#E7FFF2",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#B8F5D2",
  },
  matchBadgeText: {
    color: "#11A663",
    fontWeight: "700",
    fontSize: 13,
  },

  /* Project Card */
  projectCard: {
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    marginBottom: 20,
  },
  projectTitle: { fontSize: 15, fontWeight: "700", color: "#221244" },
  projectSub: { marginTop: 4, fontSize: 12, color: "#666" },

  /* FAB */
  fab: {
    position: "absolute",
    bottom: 86, // above footer
    left: 20,
    right: 20,
    backgroundColor: "#221244",
    paddingVertical: 12,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  /* Footer (copied style) */
  footerWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#D7E1FF",
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabBtn: { flex: 1, alignItems: "center" },
  tabIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    backgroundColor: "#E7F0FF",
  },
  tabLabel: { fontSize: 12, color: "#8a8f9b", marginTop: 4 },
  tabLabelActive: { color: "#2B75FF", fontWeight: "700" },
});
