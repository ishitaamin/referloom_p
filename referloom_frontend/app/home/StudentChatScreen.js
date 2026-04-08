import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import viditpic from "../../assets/images/vidit.jpg";
import dhyeypic from "../../assets/images/dhyey.jpg";
import devpic from "../../assets/images/dev.jpg";
import vanshipic from "../../assets/images/vanshi.jpg";
import dhvanikapic from "../../assets/images/dhvani.jpg";
import riyapic from "../../assets/images/riya.jpg"; 

export default function ChatScreen() {
  const navigation = useNavigation();

  const messages = [
    {
      id: 1,
      name: "Dhyey Bhandari",
      text: "Hey, do you have a moment to chat about the...",
      avatar: dhyeypic,
      time: "",
    },
    {
      id: 2,
      name: "Dev Bagga",
      text: "Perfect, I'll send over the documents shortly.",
      avatar: devpic,
      time: "",
    },
    {
      id: 3,
      name: "Vidit Shah",
      text: "Thanks for the feedback!",
      avatar: viditpic,
      time: "Mon",
    },
    {
      id: 4,
      name: "Vanshi Mehta",
      text: "Could you review this proposal?",
      avatar: vanshipic,
      time: "Oct 28",
      unread: 1,
    },
    {
      id: 5,
      name: "Dhvanika Naik",
      text: "You too! Have a great weekend.",
      avatar: dhvanikapic,
      time: "Oct 27",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <Text style={styles.header}>Referloom</Text>

          <View style={styles.headerIcons}>

            <TouchableOpacity onPress={() =>navigation.navigate("home/ProfileScreen")}>
  <Image
    source={require("../../assets/images/profile.jpg")}
    style={styles.profile}
  />
</TouchableOpacity>

          </View>
        </View>

        {/* Mentorship Request Section */}
        <Text style={styles.sectionTitle}>Mentorship Requests</Text>

        <View style={styles.requestCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/riya.jpg")}
              style={styles.requestAvatar}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.reqName}>Riya Patel</Text>
              <Text style={styles.reqText}>
                Wants to connect for mentorship.
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.reqBtnRow}>
            <TouchableOpacity style={styles.declineBtn}>
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.acceptBtn}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.line} />

        {/* Chat List */}
        {messages.map((msg) => (
  <TouchableOpacity key={msg.id} style={styles.chatRow}>
    <Image source={msg.avatar} style={styles.chatAvatar} />

    <View style={{ flex: 1 }}>
      <Text style={styles.chatName}>{msg.name}</Text>
      <Text style={styles.chatText}>{msg.text}</Text>
    </View>

    <View style={{ alignItems: "flex-end" }}>
      {msg.time !== "" && <Text style={styles.timeText}>{msg.time}</Text>}

      {msg.unread && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{msg.unread}</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
))}


        <View style={{ height: 90 }} />
      </ScrollView>

      {/* FOOTER NAV */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("home/StudentHomeScreen")}>
          <Ionicons name="home-outline" size={24} color="#8e8e93" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("home/StudenProjectScreen")}>
          <Ionicons name="folder-outline" size={24} color="#8e8e93" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("home/StudentExploreScreen")}>
          <Ionicons name="search-outline" size={24} color="#8e8e93" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="chatbubble" size={24} color="#2B75FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  headerRow: {
    paddingTop: 40,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  header: { fontSize: 24, fontWeight: "700", color: "#1c1c1e" },

  headerIcons: { flexDirection: "row", alignItems: "center", gap: 12 },

  profile: { width: 32, height: 32, borderRadius: 50 },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
    paddingHorizontal: 18,
  },

  requestCard: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    padding: 14,
    borderRadius: 14,
    borderColor: "#E5E7EB",
    borderWidth: 1,
  },

  requestAvatar: { width: 48, height: 48, borderRadius: 50 },

  reqName: { fontSize: 16, fontWeight: "600" },

  reqText: { fontSize: 13, color: "#6b7280", marginTop: 2 },

  reqBtnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  declineBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },

  declineText: { fontSize: 14, color: "#374151", fontWeight: "600" },

  acceptBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#2ECC71",
  },

  acceptText: { fontSize: 14, color: "#fff", fontWeight: "600" },

  line: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
    marginHorizontal: 18,
  },

  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
    
  },

  chatAvatar: { width: 48, height: 48, borderRadius: 50 },

  chatName: { fontSize: 15, fontWeight: "600",paddingLeft:10 },

  chatText: { fontSize: 13, color: "#6b7280", marginTop: 1,paddingLeft:10 },

  timeText: { fontSize: 12, color: "#6b7280", marginBottom: 6 },

  unreadBadge: {
    backgroundColor: "#2ECC71",
    width: 20,
    height: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  unreadText: { color: "#fff", fontSize: 12 },

  footer: {
    height: 65,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
