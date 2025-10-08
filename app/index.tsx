import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { Leaf, Bus, Shield } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const roleCards = [
    {
      role: 'traveler' as UserRole,
      title: 'Traveler',
      tagline: 'Explore Sustainably',
      icon: Leaf,
      gradient: ['#10b981', '#059669'] as const,
    },
    {
      role: 'tourism_service' as UserRole,
      title: 'Tourism Service',
      tagline: 'Power Greener Journeys',
      icon: Bus,
      gradient: ['#3b82f6', '#2563eb'] as const,
    },
    {
      role: 'admin' as UserRole,
      title: 'Administrator',
      tagline: 'Monitor & Certify Sustainability',
      icon: Shield,
      gradient: ['#8b5cf6', '#7c3aed'] as const,
    },
  ];

  const handleLogin = async () => {
    if (!selectedRole || !email || !password) {
      return;
    }

    await login(email, password, selectedRole);

    if (selectedRole === 'traveler') {
      router.replace('/(tabs)');
    } else if (selectedRole === 'tourism_service') {
      router.replace('/tourism');
    } else {
      router.replace('/admin');
    }
  };

  return (
    <LinearGradient colors={['#d1fae5', '#a7f3d0', '#6ee7b7']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Leaf size={48} color="#059669" strokeWidth={2.5} />
          </View>
          <Text style={styles.logoText}>EcoTravel</Text>
          <Text style={styles.tagline}>Sustainable Tourism Companion</Text>
        </View>

        <Text style={styles.sectionTitle}>Choose Your Role</Text>

        <View style={styles.roleCardsContainer}>
          {roleCards.map((card) => {
            const IconComponent = card.icon;
            const isSelected = selectedRole === card.role;

            return (
              <TouchableOpacity
                key={card.role}
                onPress={() => setSelectedRole(card.role)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={card.gradient}
                  style={[styles.roleCard, isSelected && styles.roleCardSelected]}
                >
                  <View style={styles.roleCardContent}>
                    <View style={styles.roleIconContainer}>
                      <IconComponent size={32} color="#ffffff" strokeWidth={2} />
                    </View>
                    <Text style={styles.roleTitle}>{card.title}</Text>
                    <Text style={styles.roleTagline}>{card.tagline}</Text>
                  </View>
                  {isSelected && <View style={styles.selectedIndicator} />}
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedRole && (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <LinearGradient
                colors={['#059669', '#047857']}
                style={styles.loginButtonGradient}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms & Conditions
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#047857',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 20,
    textAlign: 'center',
  },
  roleCardsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  roleCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  roleCardSelected: {
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  roleCardContent: {
    alignItems: 'center',
  },
  roleIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  roleTagline: {
    fontSize: 13,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  loginButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  forgotPassword: {
    marginTop: 16,
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});
