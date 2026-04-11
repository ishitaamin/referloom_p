// referloom_frontend/app/(roles)/alumni/_layout.js
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../../src/theme/colors';

export default function AlumniLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarActiveTintColor: COLORS.primary || '#3EB489',
      tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 10 }
    }}>
      {/* 1. BOTTOM TABS */}
      <Tabs.Screen 
        name="AlumniHomeScreen" 
        options={{ title: 'Mentorship', tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="AlumniExploreScreen" 
        options={{ title: 'Discover', tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="PostJobScreen" 
        options={{ title: 'Post Job', tabBarIcon: ({ color }) => <Feather name="plus-square" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="index" // AlumniProfileScreen
        options={{ title: 'Profile', tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} /> }} 
      />

      {/* 2. STACK SCREENS (Hidden from Bottom Tab Bar) */}
      <Tabs.Screen name="EditAlumniProfile" options={{ href: null }} />
      <Tabs.Screen name="MentorshipSessionScreen" options={{ href: null }} />
      <Tabs.Screen name="ViewStudentProfileScreen" options={{ href: null }} />
    </Tabs>
  );
}