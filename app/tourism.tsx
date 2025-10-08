import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import {
  Bus,
  Hotel,
  Plus,
  TrendingDown,
  Award,
  LogOut,
  X,
  Zap,
  Train,
} from 'lucide-react-native';

const mockServices = [
  {
    id: '1',
    type: 'transport',
    name: 'Tata Nexon EV',
    route: 'Mumbai - Pune',
    fare: 1200,
    ecoRating: 5,
    status: 'active',
    carbonSaved: 100,
  },
  {
    id: '2',
    type: 'stay',
    name: 'Green Valley Resort',
    location: 'Kerala',
    price: 2500,
    ecoRating: 5,
    status: 'approved',
    bookings: 24,
  },
  {
    id: '3',
    type: 'transport',
    name: 'Volvo CNG Bus',
    route: 'Ahmedabad - Udaipur',
    fare: 600,
    ecoRating: 4,
    status: 'active',
    carbonSaved: 65,
  },
];

export default function TourismServiceScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [serviceType, setServiceType] = useState<'transport' | 'stay'>('transport');

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#dbeafe', '#ffffff']} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Service Dashboard</Text>
            <Text style={styles.headerSubtitle}>Manage your eco-services</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#dc2626" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <TrendingDown size={24} color="#059669" strokeWidth={2} />
            <Text style={styles.statValue}>2.5 tons</Text>
            <Text style={styles.statLabel}>CO₂ Reduced</Text>
          </View>
          <View style={styles.statCard}>
            <Award size={24} color="#f59e0b" strokeWidth={2} />
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Services</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Plus size={20} color="#ffffff" strokeWidth={2.5} />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesList}>
            {mockServices.map((service) => (
              <View key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <View style={styles.serviceIconContainer}>
                    {service.type === 'transport' ? (
                      <Bus size={24} color="#3b82f6" strokeWidth={2} />
                    ) : (
                      <Hotel size={24} color="#059669" strokeWidth={2} />
                    )}
                  </View>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.serviceLocation}>
                      {service.type === 'transport' ? service.route : service.location}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      service.status === 'active' || service.status === 'approved'
                        ? styles.statusActive
                        : styles.statusInactive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        service.status === 'active' || service.status === 'approved'
                          ? styles.statusTextActive
                          : styles.statusTextInactive,
                      ]}
                    >
                      {service.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.serviceStats}>
                  <View style={styles.serviceStat}>
                    <Text style={styles.serviceStatLabel}>
                      {service.type === 'transport' ? 'Fare' : 'Price/Night'}
                    </Text>
                    <Text style={styles.serviceStatValue}>
                      ₹{service.type === 'transport' ? service.fare : service.price}
                    </Text>
                  </View>
                  <View style={styles.serviceStat}>
                    <Text style={styles.serviceStatLabel}>Eco Rating</Text>
                    <Text style={styles.serviceStatValue}>⭐ {service.ecoRating}/5</Text>
                  </View>
                  {service.type === 'transport' && service.carbonSaved && (
                    <View style={styles.serviceStat}>
                      <Text style={styles.serviceStatLabel}>CO₂ Saved</Text>
                      <Text style={styles.serviceStatValue}>{service.carbonSaved}%</Text>
                    </View>
                  )}
                  {service.type === 'stay' && service.bookings !== undefined && (
                    <View style={styles.serviceStat}>
                      <Text style={styles.serviceStatLabel}>Bookings</Text>
                      <Text style={styles.serviceStatValue}>{service.bookings}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.serviceActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
                    <Text style={styles.actionButtonTextSecondary}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Carbon Footprint Report</Text>
          <View style={styles.reportCard}>
            <LinearGradient colors={['#10b981', '#059669']} style={styles.reportGradient}>
              <View style={styles.reportHeader}>
                <Text style={styles.reportTitle}>Your Fleet Impact</Text>
                <TrendingDown size={32} color="#ffffff" strokeWidth={2} />
              </View>
              <Text style={styles.reportValue}>60% Less CO₂</Text>
              <Text style={styles.reportDescription}>
                Your eco-friendly fleet emits 60% less carbon compared to conventional vehicles
              </Text>
              <View style={styles.reportBadges}>
                <View style={styles.reportBadge}>
                  <Text style={styles.reportBadgeText}>🌱 Green Certified</Text>
                </View>
                <View style={styles.reportBadge}>
                  <Text style={styles.reportBadgeText}>⚡ Sustainable Fleet</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Service</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color="#6b7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  serviceType === 'transport' && styles.typeButtonActive,
                ]}
                onPress={() => setServiceType('transport')}
              >
                <Bus
                  size={20}
                  color={serviceType === 'transport' ? '#ffffff' : '#6b7280'}
                  strokeWidth={2}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    serviceType === 'transport' && styles.typeButtonTextActive,
                  ]}
                >
                  Transport
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  serviceType === 'stay' && styles.typeButtonActive,
                ]}
                onPress={() => setServiceType('stay')}
              >
                <Hotel
                  size={20}
                  color={serviceType === 'stay' ? '#ffffff' : '#6b7280'}
                  strokeWidth={2}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    serviceType === 'stay' && styles.typeButtonTextActive,
                  ]}
                >
                  Eco-Stay
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                  {serviceType === 'transport' ? 'Vehicle Name' : 'Property Name'}
                </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Enter name"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              {serviceType === 'transport' ? (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Vehicle Type</Text>
                    <View style={styles.vehicleTypes}>
                      <TouchableOpacity style={styles.vehicleTypeButton}>
                        <Zap size={20} color="#10b981" strokeWidth={2} />
                        <Text style={styles.vehicleTypeText}>EV</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.vehicleTypeButton}>
                        <Train size={20} color="#3b82f6" strokeWidth={2} />
                        <Text style={styles.vehicleTypeText}>Hybrid</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.vehicleTypeButton}>
                        <Bus size={20} color="#8b5cf6" strokeWidth={2} />
                        <Text style={styles.vehicleTypeText}>Bus</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Route From</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Starting point"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Route To</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Destination"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Fare (₹)</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Enter fare"
                      placeholderTextColor="#9ca3af"
                      keyboardType="numeric"
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Location</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="City, State"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Price per Night (₹)</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Enter price"
                      placeholderTextColor="#9ca3af"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Description</Text>
                    <TextInput
                      style={[styles.formInput, styles.formTextarea]}
                      placeholder="Describe your eco-stay"
                      placeholderTextColor="#9ca3af"
                      multiline
                      numberOfLines={4}
                    />
                  </View>
                </>
              )}

              <TouchableOpacity style={styles.submitButton}>
                <LinearGradient colors={['#059669', '#047857']} style={styles.submitGradient}>
                  <Text style={styles.submitButtonText}>Submit for Approval</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    color: '#1e40af',
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
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  servicesList: {
    gap: 16,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  serviceLocation: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#d1fae5',
  },
  statusInactive: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  statusTextActive: {
    color: '#065f46',
  },
  statusTextInactive: {
    color: '#991b1b',
  },
  serviceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  serviceStat: {
    alignItems: 'center',
  },
  serviceStatLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  serviceStatValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#059669',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonSecondary: {
    backgroundColor: '#f3f4f6',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  actionButtonTextSecondary: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },
  reportCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  reportGradient: {
    padding: 24,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  reportValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  reportDescription: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 16,
  },
  reportBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  reportBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  reportBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomPadding: {
    height: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingTop: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  typeSelector: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  typeButtonActive: {
    backgroundColor: '#059669',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6b7280',
  },
  typeButtonTextActive: {
    color: '#ffffff',
  },
  formScroll: {
    paddingHorizontal: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  formTextarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  vehicleTypes: {
    flexDirection: 'row',
    gap: 8,
  },
  vehicleTypeButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 4,
  },
  vehicleTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 32,
  },
  submitGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
