import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Search, Filter, Leaf, Star } from 'lucide-react-native';

const mockDestinations = [
  {
    id: '1',
    name: 'Kerala Backwaters',
    location: 'Kerala',
    state: 'Kerala',
    imageUrl: 'https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg',
    ecoRating: 5,
    isCertified: true,
    activities: ['Houseboat', 'Kayaking', 'Bird Watching'],
    description: 'Experience serene backwaters with eco-friendly houseboats',
  },
  {
    id: '2',
    name: 'Himalayan Trails',
    location: 'Rishikesh, Uttarakhand',
    state: 'Uttarakhand',
    imageUrl: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg',
    ecoRating: 5,
    isCertified: true,
    activities: ['Trekking', 'Yoga', 'River Rafting'],
    description: 'Discover pristine mountain trails and spiritual retreats',
  },
  {
    id: '3',
    name: 'Sundarbans Mangrove',
    location: 'West Bengal',
    state: 'West Bengal',
    imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
    ecoRating: 4,
    isCertified: true,
    activities: ['Wildlife Safari', 'Boat Tours', 'Photography'],
    description: 'Explore the largest mangrove forest and spot Royal Bengal Tigers',
  },
  {
    id: '4',
    name: 'Coorg Coffee Estates',
    location: 'Coorg, Karnataka',
    state: 'Karnataka',
    imageUrl: 'https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg',
    ecoRating: 5,
    isCertified: true,
    activities: ['Plantation Tour', 'Trekking', 'Bird Watching'],
    description: 'Stay in organic coffee estates amidst misty hills',
  },
  {
    id: '5',
    name: 'Ranthambore National Park',
    location: 'Rajasthan',
    state: 'Rajasthan',
    imageUrl: 'https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg',
    ecoRating: 4,
    isCertified: true,
    activities: ['Tiger Safari', 'Wildlife Photography', 'Nature Walks'],
    description: 'One of the best places to spot tigers in their natural habitat',
  },
  {
    id: '6',
    name: 'Spiti Valley',
    location: 'Himachal Pradesh',
    state: 'Himachal Pradesh',
    imageUrl: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg',
    ecoRating: 5,
    isCertified: true,
    activities: ['Trekking', 'Stargazing', 'Monastery Tours'],
    description: 'Experience the cold desert with stunning landscapes and monasteries',
  },
];

export default function DestinationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Eco Destinations</Text>
        <Text style={styles.headerSubtitle}>Explore sustainable travel destinations</Text>

        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#059669" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.destinationsGrid}>
          {mockDestinations.map((destination) => (
            <TouchableOpacity key={destination.id} style={styles.destinationCard}>
              <Image source={{ uri: destination.imageUrl }} style={styles.destinationImage} />
              {destination.isCertified && (
                <View style={styles.certifiedBadge}>
                  <Leaf size={12} color="#ffffff" strokeWidth={2} />
                  <Text style={styles.certifiedText}>Certified</Text>
                </View>
              )}
              <View style={styles.destinationContent}>
                <View style={styles.destinationHeader}>
                  <Text style={styles.destinationName}>{destination.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#fbbf24" fill="#fbbf24" strokeWidth={2} />
                    <Text style={styles.ratingText}>{destination.ecoRating}</Text>
                  </View>
                </View>
                <Text style={styles.destinationLocation}>{destination.location}</Text>
                <Text style={styles.destinationDescription} numberOfLines={2}>
                  {destination.description}
                </Text>
                <View style={styles.activitiesContainer}>
                  {destination.activities.slice(0, 2).map((activity, index) => (
                    <View key={index} style={styles.activityTag}>
                      <Text style={styles.activityTagText}>{activity}</Text>
                    </View>
                  ))}
                  {destination.activities.length > 2 && (
                    <Text style={styles.moreActivities}>+{destination.activities.length - 2}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    backgroundColor: '#f0fdf4',
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#065f46',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  filterButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  destinationsGrid: {
    padding: 24,
    gap: 20,
  },
  destinationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  destinationImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f3f4f6',
  },
  certifiedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  certifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  destinationContent: {
    padding: 16,
  },
  destinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  destinationName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
  },
  destinationLocation: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  destinationDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  activitiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  activityTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  activityTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e40af',
  },
  moreActivities: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  bottomPadding: {
    height: 20,
  },
});
