import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MentorshipHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Referloom</Text>

        <View style={styles.headerRight}>
          <Ionicons name="notifications-outline" size={22} color="#000" />
          <TouchableOpacity onPress={() => navigation.navigate("home/ProfileScreen")}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.profileImg}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

        {/* NEW MENTORSHIP REQUESTS */}
        <Text style={styles.sectionTitle}>New Mentorship Requests</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/11.jpg" }}
              style={styles.userImg}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>Jordan Smith</Text>
              <Text style={styles.userDesc}>
                Wants to connect about career advice in product design.
              </Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.acceptBtn}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineBtn}>
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PROJECTS AWAITING FEEDBACK */}
        <Text style={styles.sectionTitle}>Projects awaiting your feedback</Text>

        <View style={styles.card}>
          <Text style={styles.projectTitle}>Portfolio Redesign</Text>
          <Text style={styles.byText}>By Alex Johnson</Text>

          <TouchableOpacity style={styles.feedbackBtn}>
            <Text style={styles.feedbackText}>Add Feedback</Text>
          </TouchableOpacity>
        </View>

        {/* SUCCESS STORY */}
        <Text style={styles.sectionTitle}>Success Story of the Week</Text>

        <View style={styles.storyCard}>
          <Image
            source={{ uri: "https://i.ibb.co/4W9t7yF/woman.jpg" }}
            style={styles.storyImg}
          />

          <Text style={styles.storyTitle}>
            From Mentee to Mentor: Sarah’s Journey to Landing Her Dream Job
          </Text>

          <Text style={styles.storyDesc}>
            Discover how Sarah leveraged Referloom connections to transition
            into a lead designer at a top tech company…
          </Text>
        </View>

      </ScrollView>

      {/* Floating FAB */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* FOOTER NAV */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="home" size={22} color="#4A3AFF" />
          <Text style={styles.footerTextActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="people-outline" size={22} color="#999" />
          <Text style={styles.footerText}>Opportunities</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="git-network-outline" size={22} color="#999" />
          <Text style={styles.footerText}>Network</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#999" />
          <Text style={styles.footerText}>Chats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },
  logo: { fontSize: 20, fontWeight: "bold" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  profileImg: { width: 34, height: 34, borderRadius: 50 },

  // SECTION TITLE
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 6,
    paddingHorizontal: 18,
  },

  // CARD
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    marginBottom: 14,
  },

  row: { flexDirection: "row", columnGap: 12 },
  userImg: { width: 48, height: 48, borderRadius: 50 },
  userName: { fontWeight: "700", fontSize: 15 },
  userDesc: { color: "#666", marginTop: 4 },

  actionRow: {
    flexDirection: "row",
    marginTop: 14,
    gap: 10,
  },
  acceptBtn: {
    backgroundColor: "#3EB489",
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  acceptText: { color: "#fff", fontWeight: "600" },
  declineBtn: {
    backgroundColor: "#F3F3F3",
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  declineText: { color: "#555", fontWeight: "600" },

  // PROJECT CARD
  projectTitle: { fontSize: 15, fontWeight: "600" },
  byText: { color: "#777", marginTop: 3 },
  feedbackBtn: {
    backgroundColor: "#3EB489",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 14,
  },
  feedbackText: { color: "#fff", fontWeight: "600" },

  // STORY CARD
  storyCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    marginHorizontal: 18,
    marginBottom: 100,
    paddingBottom: 16,
  },
  storyImg: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  storyTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 12,
    marginHorizontal: 12,
  },
  storyDesc: {
    color: "#666",
    marginTop: 6,
    marginHorizontal: 12,
  },

  // FLOATING BUTTON
  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#4A3AFF",
    width: 56,
    height: 56,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  // FOOTER
  footer: {
    height: 65,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footerItem: { alignItems: "center" },
  footerTextActive: {
    fontSize: 11,
    color: "#4A3AFF",
    marginTop: 3,
    fontWeight: "700",
  },
  footerText: {
    fontSize: 11,
    color: "#999",
    marginTop: 3,
  },
});
