import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import {
  User,
  Leaf,
  Settings,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRight,
  Award,
  MapPin,
  Heart,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#d1fae5', '#ffffff']} style={styles.header}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <LinearGradient colors={['#059669', '#047857']} style={styles.avatar}>
              <User size={40} color="#ffffff" strokeWidth={2} />
            </LinearGradient>
            <View style={styles.ecoScoreBadge}>
              <Leaf size={14} color="#ffffff" strokeWidth={2} />
              <Text style={styles.ecoScoreText}>{user?.ecoScore}</Text>
            </View>
          </View>
          <Text style={styles.userName}>{user?.fullName}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <View style={styles.roleTag}>
            <Text style={styles.roleTagText}>{user?.role?.toUpperCase()}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <MapPin size={24} color="#3b82f6" strokeWidth={2} />
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>
        <View style={styles.statCard}>
          <Leaf size={24} color="#059669" strokeWidth={2} />
          <Text style={styles.statValue}>{user?.totalCarbonSaved.toFixed(0)} kg</Text>
          <Text style={styles.statLabel}>CO₂ Saved</Text>
        </View>
        <View style={styles.statCard}>
          <Award size={24} color="#f59e0b" strokeWidth={2} />
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Badges</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <User size={20} color="#059669" strokeWidth={2} />
            </View>
            <Text style={styles.menuText}>Edit Profile</Text>
            <ChevronRight size={20} color="#9ca3af" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Heart size={20} color="#059669" strokeWidth={2} />
            </View>
            <Text style={styles.menuText}>Favorites</Text>
            <ChevronRight size={20} color="#9ca3af" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <MapPin size={20} color="#059669" strokeWidth={2} />
            </View>
            <Text style={styles.menuText}>My Trips</Text>
            <ChevronRight size={20} color="#9ca3af" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Settings size={20} color="#6b7280" strokeWidth={2} />
            </View>
            <Text style={styles.menuText}>App Settings</Text>
            <ChevronRight size={20} color="#9ca3af" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Shield size={20} color="#6b7280" strokeWidth={2} />
            </View>
            <Text style={styles.menuText}>Privacy & Security</Text>
            <ChevronRight size={20} color="#9ca3af" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <HelpCircle size={20} color="#6b7280" strokeWidth={2} />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <ChevronRight size={20} color="#9ca3af" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.ecoImpactCard}>
          <LinearGradient colors={['#10b981', '#059669']} style={styles.ecoImpactGradient}>
            <View style={styles.ecoImpactHeader}>
              <Text style={styles.ecoImpactTitle}>Your Eco Impact</Text>
              <Leaf size={24} color="#ffffff" strokeWidth={2} />
            </View>
            <Text style={styles.ecoImpactValue}>
              {user?.totalCarbonSaved.toFixed(1)} kg CO₂ Saved
            </Text>
            <Text style={styles.ecoImpactDescription}>
              Equivalent to planting 12 trees 🌳
            </Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.ecoImpactGoal}>Goal: 100 kg CO₂</Text>
          </LinearGradient>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#dc2626" strokeWidth={2} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>EcoTravel v1.0.0</Text>
        <Text style={styles.footerSubtext}>Sustainable Tourism Companion</Text>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  ecoScoreBadge: {
    position: 'absolute',
    bottom: 0,
    right: -8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  ecoScoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  roleTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  roleTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e40af',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  menuGroup: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginLeft: 64,
  },
  ecoImpactCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  ecoImpactGradient: {
    padding: 24,
  },
  ecoImpactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ecoImpactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  ecoImpactValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  ecoImpactDescription: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    width: '45%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  ecoImpactGoal: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dc2626',
  },
  footer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 11,
    color: '#d1d5db',
  },
  bottomPadding: {
    height: 32,
  },
});
