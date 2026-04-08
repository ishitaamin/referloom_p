import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(300))[0];
  const navigation = useNavigation();
  

  const openModal = () => {
    setIsVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* PROFILE HEADER */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/profile.jpg")}
          style={styles.avatar}
        />

        <Text style={styles.name}>Ishita Amin</Text>
        <Text style={styles.sub}>Student</Text>

        <Text style={styles.bio}>
          Passionate Web & Software Developer currently pursuing my B.Tech in Computer Science from Navrachana University. With hands-on experience in frontend and backend technologies through internships and personal projects
        </Text>

        <View style={styles.chipContainer}>
          {["React", "Figma", "Python", "Flutter","Django"].map((item) => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))}
        </View>

       
      </View>

      {/* MY PROJECTS */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>My Projects</Text>

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={{ marginTop: 10 }}
  >
    <View style={styles.projectCard}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d",
        }}
        style={styles.projectImg}
      />
      <Text style={styles.projectTitle}>Mobile App UI</Text>
    </View>

    <View style={styles.projectCard}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1506765515384-028b60a970df",
        }}
        style={styles.projectImg}
      />
      <Text style={styles.projectTitle}>Dashboard Design</Text>
    </View>

    <View style={styles.projectCard}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1521790945508-bf2a36314e85",
        }}
        style={styles.projectImg}
      />
      <Text style={styles.projectTitle}>Analytics Concept</Text>
    </View>
  </ScrollView>
</View>

{/* MY EXPERIENCE SECTION */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>My Experience</Text>

  {/* EXPERIENCE CARD 1 */}
  <View style={styles.expCard}>
    <Text style={styles.expRole}>UI/UX Intern</Text>
    <Text style={styles.expCompany}>TechNova Solutions</Text>
    <Text style={styles.expDuration}>May 2024 – July 2024</Text>
    <Text style={styles.expDetail}>
      Worked on redesigning the company dashboard and improving the user flow
      for the onboarding process.
    </Text>
  </View>

  {/* EXPERIENCE CARD 2 */}
  <View style={styles.expCard}>
    <Text style={styles.expRole}>Product Designer Intern</Text>
    <Text style={styles.expCompany}>Referloom</Text>
    <Text style={styles.expDuration}>Nov 2024 – Present</Text>
    <Text style={styles.expDetail}>
      Currently designing workflows, project screens, and core UI for the
      Referloom platform.
    </Text>
  </View>
</View>


      {/* MENU */}
      <TouchableOpacity style={styles.menuItem} onPress={openModal}>
        <Ionicons name="settings-outline" size={22} color="#4A3AFF" />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="help-circle-outline" size={22} color="#4A3AFF" />
        <Text style={styles.menuText}>Help</Text>
      </TouchableOpacity>

<TouchableOpacity
  style={styles.logoutItem}
  onPress={() => navigation.navigate("auth/LoginScreen")}
>
        <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* BOTTOM SHEET MODAL */}
      <Modal visible={isVisible} transparent animationType="none">
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} />

        <Animated.View
          style={[
            styles.bottomSheet,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.modalTitle}>Settings</Text>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              closeModal();
              navigation.navigate("home/EditProfile");
            }}
          >
            <Ionicons name="create-outline" size={22} color="#4A3AFF" />
            <Text style={styles.modalButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalButton}>
            <Ionicons name="notifications-outline" size={22} color="#4A3AFF" />
            <Text style={styles.modalButtonText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalButton}>
            <Ionicons name="shield-outline" size={22} color="#4A3AFF" />
            <Text style={styles.modalButtonText}>Privacy Settings</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", paddingTop: 40, paddingHorizontal: 25 },
  avatar: { width: 110, height: 110, borderRadius: 70, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: "700", color: "#1A1A1A" },
  sub: { color: "#6A6A6A", fontSize: 14, marginBottom: 10 },
  bio: {
    textAlign: "center",
    color: "#4A4A4A",
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  // My Projects
projectCard: {
  width: 180,
  height: 160,
  backgroundColor: "#F3F0FF",
  borderRadius: 16,
  marginRight: 12,
  padding: 10,
},
projectImg: {
  width: "100%",
  height: 100,
  borderRadius: 12,
},
projectTitle: {
  fontSize: 14,
  fontWeight: "600",
  marginTop: 8,
  color: "#1A1A1A",
},

// Experience
expCard: {
  backgroundColor: "#F8F7FF",
  borderRadius: 14,
  padding: 15,
  marginBottom: 12,
  borderLeftWidth: 4,
  borderLeftColor: "#4A3AFF",
},
expRole: {
  fontSize: 16,
  fontWeight: "700",
  color: "#1A1A1A",
},
expCompany: {
  fontSize: 14,
  color: "#4A3AFF",
  marginVertical: 3,
  fontWeight: "600",
},
expDuration: {
  fontSize: 12,
  color: "#6A6A6A",
  marginBottom: 8,
},
expDetail: {
  fontSize: 13,
  color: "#4A4A4A",
  lineHeight: 18,
},

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 15,
  },
  chip: {
    backgroundColor: "#EFE9FF",
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  chipText: { color: "#4A3AFF", fontWeight: "600", fontSize: 12 },
  role: { color: "#6A6A6A", marginBottom: 20 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10 },
  fakeProject: {
    height: 120,
    backgroundColor: "#F3F0FF",
    borderRadius: 14,
    marginBottom: 12,
  },
  menuItem: { flexDirection: "row", alignItems: "center", padding: 18 },
  menuText: { marginLeft: 12, fontSize: 16 },
  logoutItem: { flexDirection: "row", alignItems: "center", padding: 18 },
  logoutText: { marginLeft: 12, fontSize: 16, color: "#FF3B30" },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000055",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 15 },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  modalButtonText: { fontSize: 16, marginLeft: 10 },
});
