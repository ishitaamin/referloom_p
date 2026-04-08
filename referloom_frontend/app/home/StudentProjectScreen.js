// StudentProjectScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const alumniWorking = [
  { id: 1, avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*90)}.jpg` },
  { id: 2, avatar: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random()*90)}.jpg` },
  { id: 3, avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*90)}.jpg` },
];


const sampleProjects = [
  {
    id: "1",
  title: "AI-Powered Recipe Generator",
    author: "Jane Doe · FSD '23",
    image: "https://picsum.photos/600/400?11",
    tags: ["React", "Node.js", "OpenAI API"],
    likes: 128,
    comments: 16,
  },
  {
    id: "2",
    title: "Portfolio Website Redesign",
    author: "John Smith · UX/UI '24",
    image: "https://picsum.photos/600/400?12",
    tags: ["Figma", "Webflow", "UX Research"],
    likes: 97,
    comments: 21,
  },
];

export default function StudentProjectScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Projects");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TextInput
            placeholder="Search projects"
            placeholderTextColor="#868fa6"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Feather name="sliders" size={20} color="#2B75FF" />
          </TouchableOpacity>
        </View>

        {/* FEED */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          {sampleProjects.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardAuthor}>{item.author}</Text>

                <View style={styles.tagWrap}>
                  {item.tags.map((t, i) => (
                    <View key={i} style={styles.tag}>
                      <Text style={styles.tagText}>{t}</Text>
                    </View>
                  ))}
                </View>




                <View style={styles.bottomRow}>
                  <View style={styles.statsRow}>
                    <Ionicons name="heart-outline" size={18} color="#444" />
                    <Text style={styles.statText}>{item.likes}</Text>

                    <Ionicons
                      name="chatbubble-outline"
                      size={18}
                      color="#444"
                      style={{ marginLeft: 14 }}
                    />
                    <Text style={styles.statText}>{item.comments}</Text>
                  </View>

                  <TouchableOpacity style={styles.askBtn}>
                    <Text style={styles.askBtnText}>Ask Mentorship</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* FAB */}
        <TouchableOpacity
  style={styles.fab}
  onPress={() => navigation.navigate("home/UploadProject")}
>
  <Ionicons name="add" size={30} color="#fff" />
</TouchableOpacity>


        {/* FOOTER NAV */}
        <View style={styles.footerWrap}>
          <View style={styles.footer}>
            <FooterTab
              label="Home"
              icon={<Ionicons name="home" size={20} color={activeTab==="Home"?"#2B75FF":"#8a8f9b"} />}
              active={activeTab === "Home"}
              onPress={() => navigation.navigate("home/StudentHomeScreen")}
            />

            <FooterTab
              label="Projects"
              icon={<Feather name="briefcase" size={18} color={activeTab==="Projects"?"#2B75FF":"#8a8f9b"} />}
              active={activeTab === "Projects"}
              onPress={() => navigation.navigate("home/StudentProjectScreen")}
            />

            <FooterTab
              label="Explore"
              icon={<Ionicons name="compass-outline" size={20} color={activeTab==="Explore"?"#2B75FF":"#8a8f9b"} />}
              active={activeTab === "Explore"}
              onPress={() => navigation.navigate("home/StudentExploreScreen")}
            />

            <FooterTab
              label="Chats"
              icon={<Ionicons name="chatbubble-ellipses-outline" size={20} color={activeTab==="Chats"?"#2B75FF":"#8a8f9b"} />}
              active={activeTab === "Chats"}
              onPress={() => navigation.navigate("home/StudentChatScreen")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function FooterTab({ icon, label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.tabBtn} onPress={onPress}>
      <View style={[styles.tabIconWrap, active && styles.tabActive]}>{icon}</View>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
alumniRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 12,
},

alumniAvatar: {
  width: 32,
  height: 32,
  borderRadius: 16,
  borderWidth: 2,
  borderColor: "#fff",
},

alumniText: {
  marginLeft: 8,
  fontSize: 13,
  color: "#555",
  fontWeight: "500",
},

alumniImages: {
  flexDirection: "row",
  alignItems: "center",
},

alumniImg: {
  width: 28,
  height: 28,
  borderRadius: 50,
  borderWidth: 1.5,
  borderColor: "#fff",
},

alumniText: {
  marginLeft: 8,
  fontSize: 12.5,
  color: "#555",
  fontWeight: "500",
},

  /** HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 18,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e3e7ef",
    fontSize: 14,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F6FA",
    borderWidth: 1,
    borderColor: "#e3e7ef",
  },

  /** CARD */
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 22,
    overflow: "hidden",
    borderWidth: 0.6,
    borderColor: "#ececec",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
  cardContent: {
    padding: 14,
  },
  cardTitle: {
    fontSize: 16.5,
    fontWeight: "700",
    color: "#111",
  },
  cardAuthor: {
    fontSize: 13.5,
    marginTop: 3,
    color: "#666",
  },

  tagWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  tag: {
    backgroundColor: "#F2F6FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#DFE8FF",
  },
  tagText: {
    fontSize: 11.5,
    color: "#2B75FF",
    fontWeight: "600",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    alignItems: "center",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    marginLeft: 4,
    fontSize: 13,
    color: "#333",
  },

  askBtn: {
    backgroundColor: "#221244",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  askBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  /** FAB */
  fab: {
    position: "absolute",
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: "#3EB489",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },

  /** FOOTER */
  footerWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#E5ECFF",
    backgroundColor: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tabBtn: {
    flex: 1,
    alignItems: "center",
  },
  tabIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    backgroundColor: "#E7F0FF",
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#8a8f9b",
  },
  tabLabelActive: {
    color: "#2B75FF",
    fontWeight: "700",
  },
});
