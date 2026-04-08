import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import devpic from "../../assets/images/dev.jpg";
import vanshipic from "../../assets/images/vanshi.jpg";
import dhvanikapic from "../../assets/images/dhvani.jpg";
import riyapic from "../../assets/images/riya.jpg"; 

// SAMPLE EXPLORE DATA
const exploreList = [
  {
    id: 1,
    name: "Ananya Sharma",
    subtitle: "B.Tech CSE, 2024",
    img: devpic,
  },
  {
    id: 2,
    name: "Rohan Verma",
    subtitle: "M.Tech AI, 2023",
    img: vanshipic,
  },
  {
    id: 3,
    name: "Priya Singh",
    subtitle: "B.Arch, 2022",
    img: dhvanikapic,
  },
  {
    id: 4,
    name: "Sameer Khan",
    subtitle: "B.Tech ECE, 2024",
    img: riyapic,
  },
];

export default function StudentExploreScreen() {
  const [activeTab, setActiveTab] = useState("Explore");
  const [activeToggle, setActiveToggle] = useState("Students");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* TOP BAR */}
        <View style={styles.topRow}>
          <Text style={styles.title}>Referloom</Text>
          <View style={styles.rightIcons}>
            <View style={styles.headerRight}>
  <TouchableOpacity
    onPress={() => navigation.navigate("home/ProfileScreen")}
    style={{ padding: 4 }}   // increases touch area
  >
    <Image
      source={require("../../assets/images/profile.jpg")}
      style={styles.profile}
    />
  </TouchableOpacity>
</View>

          </View>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            placeholder="Search people, skills, batch..."
            placeholderTextColor="#777"
            style={styles.searchInput}
          />
        </View>

        {/* FILTER BUTTONS */}
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Year</Text>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Branch</Text>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Skills</Text>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </TouchableOpacity>
        </View>

        {/* TOGGLE BAR */}
        <View style={styles.toggleWrap}>
          {["Students", "Alumni", "Companies"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.toggleBtn, activeToggle === item && styles.toggleActive]}
              onPress={() => setActiveToggle(item)}
            >
              <Text style={[styles.toggleText, activeToggle === item && styles.toggleTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LIST */}
        {exploreList.map((user) => (
          <View key={user.id} style={styles.listCard}>
            <Image source={user.img} style={styles.avatar} />

            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userSubtitle}>{user.subtitle}</Text>
            </View>
            <Ionicons
              name="checkmark-circle"
              size={26}
              color="#3EB489"
              style={{ marginLeft: "auto" }}
            />
          </View>
        ))}

      </ScrollView>

      {/* FOOTER NAVBAR */}
      <View style={styles.footerWrap}>
        <View style={styles.footer}>

          <FooterTab
            icon={<Ionicons name="home" size={20} color={activeTab === "Home" ? "#2B75FF" : "#8a8f9b"} />}
            label="Home"
            active={activeTab === "Home"}
            onPress={() => navigation.navigate("home/StudentHomeScreen")}
          />

          <FooterTab
            icon={<Feather name="briefcase" size={18} color={activeTab === "Projects" ? "#2B75FF" : "#8a8f9b"} />}
            label="Projects"
            active={activeTab === "Projects"}
            onPress={() => navigation.navigate("home/StudentProjectScreen")}
          />

          <FooterTab
            icon={<Ionicons name="compass-outline" size={20} color={activeTab === "Explore" ? "#2B75FF" : "#8a8f9b"} />}
            label="Explore"
            active={activeTab === "Explore"}
            onPress={() => navigation.navigate("home/StudentExploreScreen")}
          />

          <FooterTab
            icon={<Ionicons name="chatbubble-ellipses-outline" size={20} color={activeTab === "Chats" ? "#2B75FF" : "#8a8f9b"} />}
            label="Chats"
            active={activeTab === "Chats"}
            onPress={() => navigation.navigate("home/StudentChatScreen")}
          />

        </View>
      </View>
    </SafeAreaView>
  );
}

/* FOOTER COMPONENT */
function FooterTab({ icon, label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.tabBtn} onPress={onPress}>
      <View style={[styles.tabIconWrap, active && styles.tabActive]}>
        {icon}
      </View>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { paddingHorizontal: 16 },

  /* TOP */
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    alignItems: "center",
    paddingTop: 20,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#1c1c1c" },
  rightIcons: { flexDirection: "row", alignItems: "center" },
  profilePic: { width: 34, height: 34, borderRadius: 17 },

  /* SEARCH */
  searchWrap: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DFE6F4",
    marginTop: 16,
    height: 46,
    alignItems: "center",
  },
  searchInput: { flex: 1, fontSize: 14 },
  profile: {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginLeft: 12,      // spacing between icon and dp
  borderWidth: 1,
  borderColor: "#ddd",
},


  /* FILTERS */
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  filterBtn: {
    flexDirection: "row",
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#DFE6F4",
    alignItems: "center",
  },
  filterText: { fontSize: 13, marginRight: 6, color: "#333" },

  /* TOGGLE */
  toggleWrap: {
    flexDirection: "row",
    marginTop: 18,
    marginBottom: 10,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    alignItems: "center",
  },
  toggleActive: { borderBottomColor: "#2B75FF" },
  toggleText: { fontSize: 15, color: "#777" },
  toggleTextActive: { color: "#2B75FF", fontWeight: "600" },

  /* LIST */
  listCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#EEEFF3",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  userName: { fontSize: 16, fontWeight: "600" },
  userSubtitle: { color: "#666", marginTop: 2 },

  /* FOOTER */
  footerWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#D7E1FF",
    padding: 8,
    borderRadius: 16,
    elevation: 8,
  },
  footer: { flexDirection: "row", justifyContent: "space-between" },
  tabBtn: { flex: 1, alignItems: "center" },
  tabIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: { backgroundColor: "#E7F0FF" },
  tabLabel: { fontSize: 12, color: "#8a8f9b", marginTop: 4 },
  tabLabelActive: { color: "#2B75FF", fontWeight: "700" },
});
