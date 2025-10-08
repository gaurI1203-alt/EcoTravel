import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import { Award, TrendingUp, Gift, Star, Leaf } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const mockRewards = [
  {
    id: '1',
    points: 50,
    reason: 'Completed eco-friendly trip to Kerala',
    date: '2 days ago',
  },
  {
    id: '2',
    points: 30,
    reason: 'Booked EV transport',
    date: '5 days ago',
  },
  {
    id: '3',
    points: 75,
    reason: 'Stayed at certified eco-resort',
    date: '1 week ago',
  },
  {
    id: '4',
    points: 25,
    reason: 'Used public transport',
    date: '2 weeks ago',
  },
  {
    id: '5',
    points: 40,
    reason: 'Completed sustainable tour',
    date: '3 weeks ago',
  },
];

const redeemOptions = [
  {
    id: '1',
    title: 'Free Night Stay',
    points: 500,
    icon: '🏨',
    description: 'Get 1 free night at any eco-stay',
  },
  {
    id: '2',
    title: '₹500 Travel Voucher',
    points: 400,
    icon: '🎫',
    description: 'Use for transport or stays',
  },
  {
    id: '3',
    title: 'Eco Merchandise',
    points: 200,
    icon: '👕',
    description: 'Bamboo bottle or cotton tote',
  },
  {
    id: '4',
    title: 'Tree Plantation',
    points: 100,
    icon: '🌳',
    description: 'Plant a tree in your name',
  },
];

export default function RewardsScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#fef3c7', '#fde68a', '#fcd34d']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Eco Rewards</Text>
            <Text style={styles.headerSubtitle}>Your sustainable journey rewards</Text>
          </View>
          <View style={styles.rewardIcon}>
            <Award size={32} color="#f59e0b" strokeWidth={2.5} />
          </View>
        </View>

        <View style={styles.pointsCard}>
          <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.pointsGradient}>
            <View style={styles.pointsContent}>
              <View>
                <Text style={styles.pointsLabel}>Total Points</Text>
                <Text style={styles.pointsValue}>{user?.ecoScore}</Text>
              </View>
              <Star size={48} color="#ffffff" fill="#ffffff" strokeWidth={2} />
            </View>
            <View style={styles.carbonSaved}>
              <Leaf size={16} color="#ffffff" strokeWidth={2} />
              <Text style={styles.carbonSavedText}>
                {user?.totalCarbonSaved.toFixed(1)} kg CO₂ Saved
              </Text>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Redeem Your Points</Text>
          <View style={styles.redeemGrid}>
            {redeemOptions.map((option) => (
              <TouchableOpacity key={option.id} style={styles.redeemCard}>
                <View style={styles.redeemIconContainer}>
                  <Text style={styles.redeemEmoji}>{option.icon}</Text>
                </View>
                <Text style={styles.redeemTitle}>{option.title}</Text>
                <Text style={styles.redeemDescription}>{option.description}</Text>
                <View style={styles.redeemFooter}>
                  <View style={styles.pointsBadge}>
                    <Star size={12} color="#f59e0b" fill="#f59e0b" strokeWidth={2} />
                    <Text style={styles.pointsBadgeText}>{option.points}</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.redeemButton,
                      (user?.ecoScore || 0) < option.points && styles.redeemButtonDisabled,
                    ]}
                    disabled={(user?.ecoScore || 0) < option.points}
                  >
                    <Text
                      style={[
                        styles.redeemButtonText,
                        (user?.ecoScore || 0) < option.points && styles.redeemButtonTextDisabled,
                      ]}
                    >
                      {(user?.ecoScore || 0) >= option.points ? 'Redeem' : 'Locked'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Rewards</Text>
          <View style={styles.rewardsList}>
            {mockRewards.map((reward) => (
              <View key={reward.id} style={styles.rewardItem}>
                <View style={styles.rewardIconCircle}>
                  <Gift size={20} color="#059669" strokeWidth={2} />
                </View>
                <View style={styles.rewardInfo}>
                  <Text style={styles.rewardReason}>{reward.reason}</Text>
                  <Text style={styles.rewardDate}>{reward.date}</Text>
                </View>
                <View style={styles.rewardPoints}>
                  <Text style={styles.rewardPointsValue}>+{reward.points}</Text>
                  <Text style={styles.rewardPointsLabel}>pts</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Earn More Points</Text>
          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <TrendingUp size={24} color="#059669" strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Book Eco-Stays</Text>
                <Text style={styles.infoDescription}>Earn 50-100 points per booking</Text>
              </View>
            </View>
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <TrendingUp size={24} color="#3b82f6" strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Use Green Transport</Text>
                <Text style={styles.infoDescription}>Get 30-75 points per journey</Text>
              </View>
            </View>
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <TrendingUp size={24} color="#f59e0b" strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Complete Challenges</Text>
                <Text style={styles.infoDescription}>Bonus points for special activities</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
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
    paddingBottom: 100,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#92400e',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#78350f',
    marginTop: 4,
  },
  rewardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  pointsGradient: {
    padding: 24,
  },
  pointsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
  },
  carbonSaved: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  carbonSavedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    marginTop: -60,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  redeemGrid: {
    gap: 16,
  },
  redeemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  redeemIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  redeemEmoji: {
    fontSize: 32,
  },
  redeemTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  redeemDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  redeemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pointsBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400e',
  },
  redeemButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  redeemButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  redeemButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  redeemButtonTextDisabled: {
    color: '#9ca3af',
  },
  rewardsList: {
    gap: 12,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  rewardIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardInfo: {
    flex: 1,
  },
  rewardReason: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  rewardDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  rewardPoints: {
    alignItems: 'flex-end',
  },
  rewardPointsValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
  },
  rewardPointsLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  infoCards: {
    gap: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  bottomPadding: {
    height: 20,
  },
});
