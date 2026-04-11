import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../../src/theme/colors';

export default function CompanyLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarActiveTintColor: COLORS.primary,
      tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 10 }
    }}>
      {/* 1. BOTTOM TABS */}
      <Tabs.Screen name="index" options={{ title: 'Dashboard', tabBarIcon: ({ color }) => <Feather name="grid" size={24} color={color} /> }} />
      <Tabs.Screen name="CandidateDiscoveryScreen" options={{ title: 'Search', tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} /> }} />
      <Tabs.Screen name="PostJobScreen" options={{ title: 'Post Job', tabBarIcon: ({ color }) => <Feather name="plus-square" size={24} color={color} /> }} />
      
      {/* ✅ ADDED: The new Notifications Tab */}
      <Tabs.Screen name="CompanyNotificationsScreen" options={{ title: 'Requests', tabBarIcon: ({ color }) => <Feather name="bell" size={24} color={color} /> }} />

      {/* 2. STACK SCREENS (Hidden from Bottom Tab Bar) */}
      <Tabs.Screen name="JobApplicantsScreen" options={{ href: null }} />
      <Tabs.Screen name="CompanyProfileScreen" options={{ href: null }} />
      {/* ✅ ADDED: Hidden Candidate Overview Screen */}
      <Tabs.Screen name="ViewStudentProfileScreen" options={{ href: null }} />
    </Tabs>
  );
}