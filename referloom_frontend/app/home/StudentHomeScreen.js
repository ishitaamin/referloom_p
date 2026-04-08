// StudentHomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import viditpic from "../../assets/images/vidit.jpg";
import dhyeypic from "../../assets/images/dhyey.jpg";
import devpic from "../../assets/images/dev.jpg";
import vanshipic from "../../assets/images/vanshi.jpg";
import dhvanikapic from "../../assets/images/dhvani.jpg";


const SCREEN_W = Dimensions.get("window").width;
const MATCH_W = Math.round(SCREEN_W * 0.78);

const alumniWorking = [
  { id: 1, avatar: viditpic },
  { id: 2, avatar: devpic },
  { id: 3, avatar: dhvanikapic },
  { id: 4, avatar: vanshipic },
];


const sampleProjects = [
  { id: "p1", title: "Travelly App", author: "Dev parikh", image: "https://picsum.photos/300/200?1" },
  { id: "p2", title: "Morning Brew", author: "Riya Patel", image: "https://picsum.photos/300/200?2" },
  { id: "p3", title: "GreenHome", author: "Priya K", image: "https://picsum.photos/300/200?3" },
  { id: "p4", title: "FitTrack", author: "Ishita Amin", image: "https://picsum.photos/300/200?4" },
  { id: "p5", title: "EduBot", author: "Nisha shah", image: "https://picsum.photos/300/200?5" },
];

const sampleCompanyCards = [
  { id: "c1", company: "Vayana", location: "Vadodara", position: "Frontend Engineer", fit: 92 },
  { id: "c2", company: "MRI", location: "Vadoara", position: "UX Researcher", fit: 85 },
  { id: "c3", company: "Infodesk", location: "Vadodara", position: "Data Engineer", fit: 78 },
  { id: "c4", company: "Roima", location: "Vadodara", position: "ML Engineer", fit: 81 },
  { id: "c5", company: "Meditab", location: "Vadodara", position: "Backend Engineer", fit: 75 },
];
// RANDOM alumni requests
const sampleAlumniRequests = [
  {
    id: "a1",
    name: "Vidit Shah",
    role: "Product Manager • Vayana",
    status: "Accepted",
    avatar: viditpic,
  },
  {
    id: "a2",
    name: "Dhyey Patel",
    role: "Frontend Engineer • MRI",
    status: "Pending",
    avatar: dhyeypic,
  },
  {
    id: "a3",
    name: "Dev Parikh",
    role: "UI/UX Designer • Infodesk",
    status: "Accepted",
    avatar: devpic,
  },
  {
    id: "a4",
    name: "Vanshi Amin",
    role: "Software Engineer • Meditab",
    status: "Pending",
    avatar: vanshipic,
  },
  {
    id: "a5",
    name: "Dhvani Shah",
    role: "Research Analyst • Roima",
    status: "Accepted",
    avatar: dhvanikapic,
  },
];

export default function StudentHomeScreen() {
  const [activeTab, setActiveTab] = useState("Home"); // Home | Projects | Explore | Chats
    const navigation = useNavigation();
  const renderProject = (project) => (
    <View style={styles.projectCard} key={project.id}>
      <Image source={{ uri: project.image }} style={styles.projectImage} />
      <Text style={styles.projectTitle} numberOfLines={1}>{project.title}</Text>
      <Text style={styles.projectAuthor}>{project.author}</Text>
    </View>
  );

  const renderAlumniCard = ({ item }) => (
    <View style={styles.alumniCard}>
<Image source={item.avatar} style={styles.alumniAvatar} />
      <Text style={styles.alumniName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.alumniRole} numberOfLines={1}>{item.role}</Text>
      <View style={[styles.alumniBadge, item.status === "Accepted" && styles.alumniBadgeAccepted]}>
        <Text style={styles.alumniBadgeText}>{item.status}</Text>
      </View>
    </View>
  );

  const renderCompanyCard = ({ item }) => (
    <View style={styles.companyCard}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.companyIcon}>
          <Text style={{ fontWeight: "700", color: "#fff" }}>{item.company[0]}</Text>
        </View>
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.companyName}>{item.company}</Text>
          <Text style={styles.companyMeta}>{item.location} • {item.position}</Text>
        </View>
        <View style={styles.fitWrap}>
          <Text style={styles.fitScore}>{item.fit}%</Text>
          <Text style={styles.fitLabel}>FIT</Text>
        </View>
      </View>
    {/* Alumni Working Here */}
<View style={styles.alumniRow}>
  {alumniWorking.map((alumni, index) => (
    <Image
      key={alumni.id}
      source={alumni.avatar}
      style={[
        styles.smallAlumniAvatar,
        { marginLeft: index === 0 ? 0 : -12 }
      ]}
    />
  ))}

  <Text style={styles.alumniRowText}>
    {alumniWorking.length}+ alumni working here
  </Text>
</View>

      <View style={styles.companyActions}>
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyBtnText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn}>
          <Feather name="bookmark" size={16} color="#221244" />
        </TouchableOpacity>
      </View>
      
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Referloom</Text>
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

        <ScrollView contentContainerStyle={{ paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
          {/* TOP PROJECTS - horizontal */}
          

          {/* ALUMNI REQUESTS - horizontal */}
          <Text style={styles.sectionTitle}>Alumni Requests</Text>
          <FlatList
            data={sampleAlumniRequests}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id}
            renderItem={renderAlumniCard}
            contentContainerStyle={{ paddingLeft: 8, paddingRight: 12 }}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          />

          {/* LATEST MATCHES - horizontal project cards */}
          <Text style={styles.sectionTitle}>Top projects</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 8 }}>
            {sampleProjects.map(renderProject)}
          </ScrollView>

          {/* COMPANIES - vertical list */}
          <Text style={styles.sectionTitle}>Companies You Match With</Text>
          <FlatList
            data={sampleCompanyCards}
            keyExtractor={(i) => i.id}
            renderItem={renderCompanyCard}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            contentContainerStyle={{ paddingTop: 8, paddingBottom: 40 }}
          />
        </ScrollView>

        {/* Floating button */}
        

        {/* FOOTER NAV */}
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
      </View>
    </SafeAreaView>
  );
}

/* Footer tab as small component */
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
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 10 },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6,paddingTop:20 },
  logo: { fontSize: 22, fontWeight: "700", color: "#221244" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 36, height: 36, borderRadius: 18, marginLeft: 12 },

  sectionTitle: { fontSize: 16, fontWeight: "700", marginTop: 12, marginBottom: 8, color: "#221244" },

  /* Top project cards */
  horizontalList: { paddingRight: 8 },
  projectCard: { width: 150, marginRight: 12, borderRadius: 10, overflow: "hidden" },
  projectImage: { width: "100%", height: 110, borderRadius: 10, backgroundColor: "#eee" },
  projectTitle: { fontWeight: "700", marginTop: 8, color: "#222" },
  projectAuthor: { fontSize: 12, color: "#7a7a7a" },
alumniRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 14,
},

smallAlumniAvatar: {
  width: 26,
  height: 26,
  borderRadius: 13,
  borderWidth: 2,
  borderColor: "#fff",
},

alumniRowText: {
  marginLeft: 8,
  fontSize: 12,
  color: "#444",
  fontWeight: "600",
},

  /* Alumni horizontal card */
  alumniCard: {
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  alumniAvatar: { width: 64, height: 64, borderRadius: 32, marginBottom: 8 },
  alumniName: { fontSize: 14, fontWeight: "700", textAlign: "center" },
  alumniRole: { fontSize: 12, color: "#666", textAlign: "center", marginTop: 4 },
  alumniBadge: { marginTop: 8, backgroundColor: "#FFF3CD", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  alumniBadgeAccepted: { backgroundColor: "#D4F8E8" },
  alumniBadgeText: { color: "#C58A07", fontWeight: "700", fontSize: 12 },

  /* Matches (horizontal) */
  matchCard: {
    width: MATCH_W,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  matchTop: { flexDirection: "row", alignItems: "center" },
  avatarBigWrap: { width: 72, height: 72, borderRadius: 36, overflow: "hidden" },
  avatarBig: { width: 72, height: 72, borderRadius: 36 },
  matchName: { fontSize: 16, fontWeight: "700", color: "#111" },
  matchSub: { fontSize: 12, color: "#666", marginTop: 4 },

  matchMiddle: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 },
  scoreCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 8,
    borderColor: "#3EB489",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: { fontSize: 20, fontWeight: "800" },

  matchActions: { flexDirection: "row", alignItems: "center" },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    backgroundColor: "#fff",
  },
  heartBtn: { backgroundColor: "#3EB489", borderColor: "#3EB489" },

  /* Company vertical card */
  companyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
    width: "100%",
  },
  companyIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#2B255C",
    alignItems: "center",
    justifyContent: "center",
  },
  companyName: { fontSize: 16, fontWeight: "700", color: "#111" },
  companyMeta: { fontSize: 12, color: "#666", marginTop: 4 },

  fitWrap: { alignItems: "center" },
  fitScore: { fontSize: 18, fontWeight: "800", color: "#221244" },
  fitLabel: { fontSize: 11, color: "#666", marginTop: 2 },

  companyActions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 12, alignItems: "center" },
  applyBtn: {
    backgroundColor: "#3EB489",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
  },
  applyBtnText: { color: "#fff", fontWeight: "700" },
  saveBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginLeft: 12,      // spacing between icon and dp
  borderWidth: 1,
  borderColor: "#ddd",
},

  /* FAB */
  fab: {
    position: "absolute",
    right: 20,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3EB489",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },

  /* Footer */
  footerWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    // subtle border/background like your screenshot
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
