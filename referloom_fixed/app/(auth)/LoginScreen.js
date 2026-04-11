import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import ScreenWrapper from '../../src/components/ui/ScreenWrapper';
// 1. THIS IS THE MISSING IMPORT!
import { useAuth } from '../../src/context/AuthContext'; 

// 2. Import your UI components and theme
import { COLORS } from '../../src/theme/colors';
import PrimaryButton from '../../src/components/ui/PrimaryButton';
import CustomInput from '../../src/components/ui/CustomInput';

export default function LoginScreen() {
  // Now useAuth is properly imported and can be used here
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }

    try {
      await login(email, password);
      router.replace('/'); 
    } catch (error) {
      // Add this console.log to see the exact network failure in your Expo terminal
      console.error("🚨 FULL LOGIN ERROR:", error); 
      alert("Login failed: " + (error.message || error));
    }
  };

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue to Referloom</Text>

      <CustomInput
  label="Email Address"
  icon="mail"
  placeholder="Enter your college or work email"
  value={email}
  onChangeText={setEmail}
  autoCapitalize="none"
  keyboardType="email-address"
/>

<CustomInput
  label="Password"
  icon="lock"
  placeholder="Enter your password"
  value={password}
  onChangeText={setPassword}
  password={true} // Automatically adds the eye-toggle logic!
/>

      <PrimaryButton
        title="Log In"
        onPress={handleLogin}
        isLoading={isLoading}
      />
      
      {/* Navigation to Sign up */}
      <TouchableOpacity 
        style={styles.linkContainer} 
        onPress={() => router.push('/(auth)/RoleSelectScreen')}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 24, 
    justifyContent: 'center', 
    backgroundColor: COLORS.background 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: COLORS.text.primary, 
    marginBottom: 8 
  },
  subtitle: { 
    fontSize: 16, 
    color: COLORS.text.secondary, 
    marginBottom: 32 
  },
  input: { 
    backgroundColor: COLORS.surface, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: 8, 
    padding: 16, 
    marginBottom: 16, 
    fontSize: 16 
  },
  linkContainer: {
    marginTop: 24,
    alignItems: 'center'
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14
  }
});