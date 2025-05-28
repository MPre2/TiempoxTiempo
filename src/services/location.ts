import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc, orderBy, limit, Timestamp, GeoPoint } from 'firebase/firestore';
import { app } from '../config/firebase';
import { Location, Service } from '../types';

const db = getFirestore(app);

export const locationService = {
  // Convertir Location a GeoPoint de Firestore
  toGeoPoint(location: Location): GeoPoint {
    return new GeoPoint(location.latitude, location.longitude);
  },

  // Convertir GeoPoint a Location
  fromGeoPoint(geoPoint: GeoPoint, address?: string): Location {
    return {
      latitude: geoPoint.latitude,
      longitude: geoPoint.longitude,
      address
    };
  },

  // Calcular distancia entre dos puntos en kilómetros
  calculateDistance(location1: Location, location2: Location): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRad(location2.latitude - location1.latitude);
    const dLon = this.toRad(location2.longitude - location1.longitude);
    const lat1 = this.toRad(location1.latitude);
    const lat2 = this.toRad(location2.latitude);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  // Convertir grados a radianes
  private toRad(degrees: number): number {
    return degrees * Math.PI / 180;
  },

  // Buscar servicios cercanos
  async findNearbyServices(location: Location, radius: number, limit: number = 20): Promise<Service[]> {
    const servicesRef = collection(db, 'services');
    const center = this.toGeoPoint(location);
    
    // Obtener todos los servicios activos
    const q = query(
      servicesRef,
      where('status', '==', 'active'),
      limit(100) // Aumentar si es necesario
    );
    
    const querySnapshot = await getDocs(q);
    const services = querySnapshot.docs.map(doc => doc.data() as Service);
    
    // Filtrar por distancia
    return services
      .filter(service => {
        const distance = this.calculateDistance(location, service.location);
        return distance <= radius;
      })
      .sort((a, b) => {
        const distanceA = this.calculateDistance(location, a.location);
        const distanceB = this.calculateDistance(location, b.location);
        return distanceA - distanceB;
      })
      .slice(0, limit);
  },

  // Actualizar ubicación del usuario
  async updateUserLocation(userId: string, location: Location): Promise<void> {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      location: this.toGeoPoint(location),
      updatedAt: Timestamp.now()
    });
  },

  // Verificar si un servicio está disponible en la ubicación del usuario
  async isServiceAvailableInLocation(serviceId: string, userLocation: Location): Promise<boolean> {
    const serviceRef = doc(db, 'services', serviceId);
    const serviceSnap = await getDoc(serviceRef);
    
    if (!serviceSnap.exists()) return false;
    
    const service = serviceSnap.data() as Service;
    const distance = this.calculateDistance(userLocation, service.location);
    
    return distance <= service.radius;
  },

  // Obtener servicios por categoría en un área específica
  async getServicesByCategoryInArea(
    category: string,
    location: Location,
    radius: number,
    limit: number = 20
  ): Promise<Service[]> {
    const services = await this.findNearbyServices(location, radius, limit);
    return services.filter(service => service.category === category);
  },

  // Verificar disponibilidad horaria
  isAvailableNow(availability: { dayOfWeek: number; startTime: string; endTime: string }[]): boolean {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false });

    const todayAvailability = availability.find(a => a.dayOfWeek === currentDay);
    if (!todayAvailability) return false;

    return currentTime >= todayAvailability.startTime && currentTime <= todayAvailability.endTime;
  }
}; 