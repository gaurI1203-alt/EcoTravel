export type UserRole = 'traveler' | 'tourism_service' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  ecoScore: number;
  totalCarbonSaved: number;
}

export interface EcoDestination {
  id: string;
  name: string;
  description: string;
  location: string;
  state: string;
  imageUrl: string;
  ecoRating: number;
  isCertified: boolean;
  activities: string[];
}

export interface EcoStay {
  id: string;
  name: string;
  destinationId: string;
  description: string;
  pricePerNight: number;
  imageUrl: string;
  ecoRating: number;
  isCertified: boolean;
  amenities: string[];
  providerId: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface TransportService {
  id: string;
  providerId: string;
  vehicleType: 'EV' | 'Hybrid' | 'Bus' | 'Train' | 'Bicycle';
  vehicleName: string;
  routeFrom: string;
  routeTo: string;
  fare: number;
  carbonEmissionPerKm: number;
  ecoRating: number;
  isCertified: boolean;
  availableSeats: number;
  status: 'active' | 'inactive';
}

export interface Booking {
  id: string;
  userId: string;
  bookingType: 'stay' | 'transport';
  referenceId: string;
  bookingDate: Date;
  checkInDate?: Date;
  checkOutDate?: Date;
  totalAmount: number;
  carbonSaved: number;
  status: 'confirmed' | 'cancelled' | 'completed';
}

export interface EcoReward {
  id: string;
  userId: string;
  points: number;
  reason: string;
  bookingId?: string;
  createdAt: Date;
}
