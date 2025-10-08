import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap, Bus, Train, Bike, TrendingDown, MapPin } from 'lucide-react-native';

const mockTransportServices = [
  {
    id: '1',
    vehicleType: 'EV',
    vehicleName: 'Tata Nexon EV',
    routeFrom: 'Mumbai',
    routeTo: 'Pune',
    fare: 1200,
    carbonEmissionPerKm: 0,
    ecoRating: 5,
    isCertified: true,
    availableSeats: 3,
    carbonSavedPercent: 100,
  },
  {
    id: '2',
    vehicleType: 'Train',
    vehicleName: 'Vande Bharat Express',
    routeFrom: 'Delhi',
    routeTo: 'Varanasi',
    fare: 1500,
    carbonEmissionPerKm: 0.02,
    ecoRating: 5,
    isCertified: true,
    availableSeats: 45,
    carbonSavedPercent: 75,
  },
  {
    id: '3',
    vehicleType: 'Hybrid',
    vehicleName: 'Toyota Camry Hybrid',
    routeFrom: 'Bangalore',
    routeTo: 'Mysore',
    fare: 800,
    carbonEmissionPerKm: 0.05,
    ecoRating: 4,
    isCertified: true,
    availableSeats: 2,
    carbonSavedPercent: 60,
  },
  {
    id: '4',
    vehicleType: 'Bus',
    vehicleName: 'Volvo CNG Bus',
    routeFrom: 'Ahmedabad',
    routeTo: 'Udaipur',
    fare: 600,
    carbonEmissionPerKm: 0.04,
    ecoRating: 4,
    isCertified: true,
    availableSeats: 28,
    carbonSavedPercent: 65,
  },
  {
    id: '5',
    vehicleType: 'EV',
    vehicleName: 'Mahindra e-Verito',
    routeFrom: 'Jaipur',
    routeTo: 'Ajmer',
    fare: 700,
    carbonEmissionPerKm: 0,
    ecoRating: 5,
    isCertified: true,
    availableSeats: 4,
    carbonSavedPercent: 100,
  },
];

const getVehicleIcon = (type: string) => {
  switch (type) {
    case 'EV':
      return Zap;
    case 'Bus':
      return Bus;
    case 'Train':
      return Train;
    case 'Bicycle':
      return Bike;
    default:
      return Bus;
  }
};

const getVehicleColor = (type: string) => {
  switch (type) {
    case 'EV':
      return '#10b981';
    case 'Train':
      return '#3b82f6';
    case 'Hybrid':
      return '#f59e0b';
    case 'Bus':
      return '#8b5cf6';
    default:
      return '#6b7280';
  }
};

export default function TransportScreen() {
  const [routeFrom, setRouteFrom] = useState('');
  const [routeTo, setRouteTo] = useState('');

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#ecfdf5', '#ffffff']} style={styles.header}>
        <Text style={styles.headerTitle}>Green Transport</Text>
        <Text style={styles.headerSubtitle}>Travel sustainably with eco-friendly options</Text>

        <View style={styles.routeInputContainer}>
          <View style={styles.inputWrapper}>
            <MapPin size={18} color="#059669" strokeWidth={2} />
            <TextInput
              style={styles.routeInput}
              placeholder="From"
              placeholderTextColor="#9ca3af"
              value={routeFrom}
              onChangeText={setRouteFrom}
            />
          </View>
          <View style={styles.inputDivider} />
          <View style={styles.inputWrapper}>
            <MapPin size={18} color="#dc2626" strokeWidth={2} />
            <TextInput
              style={styles.routeInput}
              placeholder="To"
              placeholderTextColor="#9ca3af"
              value={routeTo}
              onChangeText={setRouteTo}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <LinearGradient colors={['#059669', '#047857']} style={styles.searchButtonGradient}>
            <Text style={styles.searchButtonText}>Search Routes</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.transportList}>
          {mockTransportServices.map((service) => {
            const VehicleIcon = getVehicleIcon(service.vehicleType);
            const vehicleColor = getVehicleColor(service.vehicleType);

            return (
              <TouchableOpacity key={service.id} style={styles.transportCard}>
                <View style={styles.transportHeader}>
                  <View style={[styles.vehicleIconContainer, { backgroundColor: vehicleColor }]}>
                    <VehicleIcon size={24} color="#ffffff" strokeWidth={2} />
                  </View>
                  <View style={styles.transportInfo}>
                    <View style={styles.transportTitleRow}>
                      <Text style={styles.vehicleName}>{service.vehicleName}</Text>
                      {service.isCertified && (
                        <View style={styles.certifiedBadge}>
                          <Text style={styles.certifiedText}>🌱 Certified</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.vehicleType}>{service.vehicleType}</Text>
                  </View>
                </View>

                <View style={styles.routeContainer}>
                  <View style={styles.routePoint}>
                    <View style={styles.routeDot} />
                    <Text style={styles.routeText}>{service.routeFrom}</Text>
                  </View>
                  <View style={styles.routeLine} />
                  <View style={styles.routePoint}>
                    <View style={[styles.routeDot, styles.routeDotEnd]} />
                    <Text style={styles.routeText}>{service.routeTo}</Text>
                  </View>
                </View>

                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <TrendingDown size={16} color="#059669" strokeWidth={2} />
                    <Text style={styles.statValue}>{service.carbonSavedPercent}%</Text>
                    <Text style={styles.statLabel}>Less CO₂</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{service.availableSeats}</Text>
                    <Text style={styles.statLabel}>Seats Left</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.fareValue}>₹{service.fare}</Text>
                    <Text style={styles.statLabel}>Fare</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.bookButton}>
                  <LinearGradient
                    colors={[vehicleColor, vehicleColor]}
                    style={styles.bookButtonGradient}
                  >
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Why Choose Green Transport?</Text>
          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <Text style={styles.infoEmoji}>🌍</Text>
              <Text style={styles.infoCardTitle}>Reduce Carbon Footprint</Text>
              <Text style={styles.infoCardText}>
                Cut emissions by up to 100% with electric vehicles
              </Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoEmoji}>💰</Text>
              <Text style={styles.infoCardTitle}>Cost Effective</Text>
              <Text style={styles.infoCardText}>
                Save money while traveling sustainably
              </Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoEmoji}>🎁</Text>
              <Text style={styles.infoCardTitle}>Earn Rewards</Text>
              <Text style={styles.infoCardText}>
                Get eco-points for every green journey
              </Text>
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
    marginBottom: 20,
  },
  routeInputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  routeInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  inputDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  searchButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
  },
  searchButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  transportList: {
    padding: 24,
    gap: 16,
  },
  transportCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  transportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  vehicleIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transportInfo: {
    flex: 1,
  },
  transportTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  certifiedBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  certifiedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#065f46',
  },
  vehicleType: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  routeContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#059669',
  },
  routeDotEnd: {
    backgroundColor: '#dc2626',
  },
  routeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#d1d5db',
    marginLeft: 4,
    marginVertical: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 4,
  },
  fareValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#e5e7eb',
  },
  bookButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  infoSection: {
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoCards: {
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
  },
  infoEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#065f46',
    marginBottom: 4,
  },
  infoCardText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  },
});
