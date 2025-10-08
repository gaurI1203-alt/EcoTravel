import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import {
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  Award,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  Leaf,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const pendingApprovals = [
  {
    id: '1',
    type: 'stay',
    name: 'Mountain View Eco Resort',
    provider: 'Rahul Sharma',
    location: 'Manali, HP',
    submittedDate: '2 days ago',
  },
  {
    id: '2',
    type: 'transport',
    name: 'Mahindra e-Verito',
    provider: 'Green Travels',
    route: 'Jaipur - Ajmer',
    submittedDate: '5 days ago',
  },
  {
    id: '3',
    type: 'stay',
    name: 'Beach Front Eco Villa',
    provider: 'Coastal Stays',
    location: 'Goa',
    submittedDate: '1 week ago',
  },
];

const topDestinations = [
  { name: 'Kerala Backwaters', visits: 1245, growth: 15 },
  { name: 'Himalayan Trails', visits: 982, growth: 22 },
  { name: 'Coorg Coffee Estates', visits: 756, growth: 8 },
  { name: 'Sundarbans', visits: 634, growth: 12 },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'analytics'>('analytics');

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const handleApprove = (id: string) => {
    console.log('Approved:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejected:', id);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#f3e8ff', '#ffffff']} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Admin Dashboard</Text>
            <Text style={styles.headerSubtitle}>Monitor & Certify Sustainability</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#dc2626" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'analytics' && styles.tabActive]}
            onPress={() => setSelectedTab('analytics')}
          >
            <BarChart3
              size={18}
              color={selectedTab === 'analytics' ? '#7c3aed' : '#9ca3af'}
              strokeWidth={2}
            />
            <Text
              style={[styles.tabText, selectedTab === 'analytics' && styles.tabTextActive]}
            >
              Analytics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'pending' && styles.tabActive]}
            onPress={() => setSelectedTab('pending')}
          >
            <Clock
              size={18}
              color={selectedTab === 'pending' ? '#7c3aed' : '#9ca3af'}
              strokeWidth={2}
            />
            <Text
              style={[styles.tabText, selectedTab === 'pending' && styles.tabTextActive]}
            >
              Approvals ({pendingApprovals.length})
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'analytics' ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <View style={styles.statIconContainer}>
                    <Users size={24} color="#3b82f6" strokeWidth={2} />
                  </View>
                  <Text style={styles.statValue}>12,450</Text>
                  <Text style={styles.statLabel}>Total Users</Text>
                  <View style={styles.growthBadge}>
                    <TrendingUp size={12} color="#059669" strokeWidth={2} />
                    <Text style={styles.growthText}>+18%</Text>
                  </View>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statIconContainer}>
                    <MapPin size={24} color="#059669" strokeWidth={2} />
                  </View>
                  <Text style={styles.statValue}>245</Text>
                  <Text style={styles.statLabel}>Destinations</Text>
                  <View style={styles.growthBadge}>
                    <TrendingUp size={12} color="#059669" strokeWidth={2} />
                    <Text style={styles.growthText}>+12%</Text>
                  </View>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statIconContainer}>
                    <Award size={24} color="#f59e0b" strokeWidth={2} />
                  </View>
                  <Text style={styles.statValue}>186</Text>
                  <Text style={styles.statLabel}>Certified</Text>
                  <View style={styles.growthBadge}>
                    <TrendingUp size={12} color="#059669" strokeWidth={2} />
                    <Text style={styles.growthText}>+25%</Text>
                  </View>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statIconContainer}>
                    <Leaf size={24} color="#10b981" strokeWidth={2} />
                  </View>
                  <Text style={styles.statValue}>1,245</Text>
                  <Text style={styles.statLabel}>Tons CO₂ Saved</Text>
                  <View style={styles.growthBadge}>
                    <TrendingUp size={12} color="#059669" strokeWidth={2} />
                    <Text style={styles.growthText}>+32%</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Carbon Impact</Text>
              <View style={styles.carbonCard}>
                <LinearGradient colors={['#10b981', '#059669']} style={styles.carbonGradient}>
                  <View style={styles.carbonHeader}>
                    <Text style={styles.carbonTitle}>Total Carbon Saved</Text>
                    <Leaf size={32} color="#ffffff" strokeWidth={2} />
                  </View>
                  <Text style={styles.carbonValue}>1,245 tons CO₂</Text>
                  <Text style={styles.carbonDescription}>
                    Equivalent to planting 52,000 trees this month
                  </Text>
                  <View style={styles.carbonStats}>
                    <View style={styles.carbonStat}>
                      <Text style={styles.carbonStatValue}>8,456</Text>
                      <Text style={styles.carbonStatLabel}>Eco Trips</Text>
                    </View>
                    <View style={styles.carbonDivider} />
                    <View style={styles.carbonStat}>
                      <Text style={styles.carbonStatValue}>3,234</Text>
                      <Text style={styles.carbonStatLabel}>Green Transport</Text>
                    </View>
                    <View style={styles.carbonDivider} />
                    <View style={styles.carbonStat}>
                      <Text style={styles.carbonStatValue}>5,222</Text>
                      <Text style={styles.carbonStatLabel}>Eco Stays</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Top Eco Destinations</Text>
              <View style={styles.destinationsList}>
                {topDestinations.map((destination, index) => (
                  <View key={index} style={styles.destinationItem}>
                    <View style={styles.destinationRank}>
                      <Text style={styles.destinationRankText}>{index + 1}</Text>
                    </View>
                    <View style={styles.destinationInfo}>
                      <Text style={styles.destinationName}>{destination.name}</Text>
                      <View style={styles.destinationStats}>
                        <Text style={styles.destinationVisits}>
                          {destination.visits.toLocaleString('en-IN')} visits
                        </Text>
                        <View style={styles.destinationGrowth}>
                          <TrendingUp size={12} color="#059669" strokeWidth={2} />
                          <Text style={styles.destinationGrowthText}>
                            {destination.growth}%
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>User Eco Scores</Text>
              <View style={styles.ecoScoreCard}>
                <View style={styles.ecoScoreItem}>
                  <Text style={styles.ecoScoreLabel}>Average Score</Text>
                  <Text style={styles.ecoScoreValue}>324</Text>
                </View>
                <View style={styles.ecoScoreDivider} />
                <View style={styles.ecoScoreItem}>
                  <Text style={styles.ecoScoreLabel}>Top User</Text>
                  <Text style={styles.ecoScoreValue}>1,250</Text>
                </View>
                <View style={styles.ecoScoreDivider} />
                <View style={styles.ecoScoreItem}>
                  <Text style={styles.ecoScoreLabel}>Total Points</Text>
                  <Text style={styles.ecoScoreValue}>4.2M</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Approvals</Text>
            <View style={styles.approvalsList}>
              {pendingApprovals.map((item) => (
                <View key={item.id} style={styles.approvalCard}>
                  <View style={styles.approvalHeader}>
                    <View style={styles.approvalBadge}>
                      <Text style={styles.approvalBadgeText}>
                        {item.type === 'stay' ? '🏨 Stay' : '🚗 Transport'}
                      </Text>
                    </View>
                    <Text style={styles.approvalDate}>{item.submittedDate}</Text>
                  </View>

                  <Text style={styles.approvalName}>{item.name}</Text>
                  <Text style={styles.approvalProvider}>by {item.provider}</Text>
                  <Text style={styles.approvalLocation}>
                    {item.type === 'stay' ? item.location : item.route}
                  </Text>

                  <View style={styles.approvalActions}>
                    <TouchableOpacity
                      style={styles.approveButton}
                      onPress={() => handleApprove(item.id)}
                    >
                      <CheckCircle size={18} color="#ffffff" strokeWidth={2} />
                      <Text style={styles.approveButtonText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={() => handleReject(item.id)}
                    >
                      <XCircle size={18} color="#dc2626" strokeWidth={2} />
                      <Text style={styles.rejectButtonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

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
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#6b21a8',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#f3e8ff',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9ca3af',
  },
  tabTextActive: {
    color: '#7c3aed',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  growthText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  carbonCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  carbonGradient: {
    padding: 24,
  },
  carbonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  carbonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  carbonValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  carbonDescription: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 20,
  },
  carbonStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  carbonStat: {
    alignItems: 'center',
  },
  carbonStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  carbonStatLabel: {
    fontSize: 11,
    color: '#ffffff',
    opacity: 0.9,
  },
  carbonDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  destinationsList: {
    gap: 12,
  },
  destinationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  destinationRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationRankText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6b7280',
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  destinationStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  destinationVisits: {
    fontSize: 13,
    color: '#6b7280',
  },
  destinationGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  destinationGrowthText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065f46',
  },
  ecoScoreCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ecoScoreItem: {
    flex: 1,
    alignItems: 'center',
  },
  ecoScoreLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
  ecoScoreValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  ecoScoreDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  approvalsList: {
    gap: 16,
  },
  approvalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  approvalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  approvalBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  approvalBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e40af',
  },
  approvalDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  approvalName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  approvalProvider: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  approvalLocation: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
  },
  approvalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  approveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  approveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#dc2626',
  },
  bottomPadding: {
    height: 32,
  },
});
