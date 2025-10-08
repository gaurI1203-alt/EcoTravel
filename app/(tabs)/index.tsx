import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import { Leaf, TrendingUp, MapPin, Hotel, Car, Sparkles } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const mockDestinations = [
  {
    id: '1',
    name: 'Kerala Backwaters',
    location: 'Kerala',
    imageUrl: 'https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg',
    ecoRating: 5,
  },
  {
    id: '2',
    name: 'Himalayan Trails',
    location: 'Uttarakhand',
    imageUrl: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg',
    ecoRating: 5,
  },
  {
    id: '3',
    name: 'Sundarbans Mangrove',
    location: 'West Bengal',
    imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
    ecoRating: 4,
  },
];

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#d1fae5', '#ffffff']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Namaste, {user?.fullName}!</Text>
            <Text style={styles.subGreeting}>Where do you want to go?</Text>
          </View>
          <View style={styles.ecoScoreContainer}>
            <Leaf size={20} color="#059669" strokeWidth={2} />
            <Text style={styles.ecoScore}>{user?.ecoScore}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <TrendingUp size={24} color="#059669" strokeWidth={2} />
          </View>
          <Text style={styles.statValue}>{user?.totalCarbonSaved.toFixed(1)} kg</Text>
          <Text style={styles.statLabel}>CO₂ Saved</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <MapPin size={24} color="#3b82f6" strokeWidth={2} />
          </View>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Leaf size={24} color="#10b981" strokeWidth={2} />
          </View>
          <Text style={styles.statValue}>92%</Text>
          <Text style={styles.statLabel}>Eco Rating</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🌿 Eco Destinations</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {mockDestinations.map((destination) => (
            <TouchableOpacity key={destination.id} style={styles.destinationCard}>
              <Image source={{ uri: destination.imageUrl }} style={styles.destinationImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.destinationOverlay}
              >
                <View style={styles.ecoRatingBadge}>
                  <Leaf size={12} color="#ffffff" strokeWidth={2} />
                  <Text style={styles.ecoRatingText}>{destination.ecoRating}/5</Text>
                </View>
                <Text style={styles.destinationName}>{destination.name}</Text>
                <Text style={styles.destinationLocation}>{destination.location}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.aiPlannerButton}>
        <LinearGradient colors={['#059669', '#047857']} style={styles.aiPlannerGradient}>
          <Sparkles size={24} color="#ffffff" strokeWidth={2} />
          <Text style={styles.aiPlannerText}>Plan My Eco Trip with AI</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚴 Adventure & Trails</Text>
        <View style={styles.activityGrid}>
          <TouchableOpacity style={styles.activityCard}>
            <View style={[styles.activityIcon, { backgroundColor: '#dbeafe' }]}>
              <Text style={styles.activityEmoji}>🚴</Text>
            </View>
            <Text style={styles.activityName}>Cycling Tours</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityCard}>
            <View style={[styles.activityIcon, { backgroundColor: '#fef3c7' }]}>
              <Text style={styles.activityEmoji}>🥾</Text>
            </View>
            <Text style={styles.activityName}>Hiking Trails</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityCard}>
            <View style={[styles.activityIcon, { backgroundColor: '#d1fae5' }]}>
              <Text style={styles.activityEmoji}>🏞️</Text>
            </View>
            <Text style={styles.activityName}>Rural Stays</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityCard}>
            <View style={[styles.activityIcon, { backgroundColor: '#fce7f3' }]}>
              <Text style={styles.activityEmoji}>🌊</Text>
            </View>
            <Text style={styles.activityName}>Water Sports</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity style={styles.quickAccessCard}>
            <Hotel size={32} color="#059669" strokeWidth={2} />
            <Text style={styles.quickAccessText}>Eco-Stays</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessCard}>
            <Car size={32} color="#059669" strokeWidth={2} />
            <Text style={styles.quickAccessText}>Green Transport</Text>
          </TouchableOpacity>
        </View>
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
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#065f46',
  },
  subGreeting: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  ecoScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ecoScore: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: -20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  seeAll: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  carousel: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  destinationCard: {
    width: width * 0.7,
    height: 220,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  ecoRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    marginBottom: 8,
  },
  ecoRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  destinationName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  destinationLocation: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  aiPlannerButton: {
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  aiPlannerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  aiPlannerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  activityCard: {
    width: (width - 60) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityEmoji: {
    fontSize: 32,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  quickAccessCard: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065f46',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 32,
  },
});
