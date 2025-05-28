import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import app from '../config/firebase';
import type { User, Service, Transaction } from '../types';
import type { Review } from '../types/review';
import { gamificationService } from './gamification';

const db = getFirestore(app);

// Servicios de Usuario
export const userService = {
  async createUser(userData: Omit<User, 'createdAt' | 'updatedAt'>): Promise<void> {
    const userRef = doc(db, 'users', userData.uid);
    const now = Timestamp.now();
    await setDoc(userRef, {
      ...userData,
      level: 1,
      experience: 0,
      badges: [],
      achievements: [],
      streak: 0,
      lastActivityDate: now,
      createdAt: now,
      updatedAt: now,
    });
  },

  async getUser(uid: string): Promise<User | null> {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? (userSnap.data() as User) : null;
  },

  async updateUser(uid: string, data: Partial<User>): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },
};

// Servicios de Servicios
export const serviceService = {
  async createService(serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const servicesRef = collection(db, 'services');
    const newServiceRef = doc(servicesRef);
    const now = Timestamp.now();
    await setDoc(newServiceRef, {
      ...serviceData,
      id: newServiceRef.id,
      createdAt: now,
      updatedAt: now,
    });

    // Otorgar experiencia por crear un servicio
    await gamificationService.addExperience(serviceData.providerId, 50);
    await gamificationService.updateStreak(serviceData.providerId);

    return newServiceRef.id;
  },

  async getService(id: string): Promise<Service | null> {
    const serviceRef = doc(db, 'services', id);
    const serviceSnap = await getDoc(serviceRef);
    return serviceSnap.exists() ? (serviceSnap.data() as Service) : null;
  },

  async getServicesByProvider(providerId: string): Promise<Service[]> {
    const servicesRef = collection(db, 'services');
    const q = query(servicesRef, where('providerId', '==', providerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Service);
  },

  async updateService(id: string, data: Partial<Service>): Promise<void> {
    const serviceRef = doc(db, 'services', id);
    await updateDoc(serviceRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },

  async deleteService(id: string): Promise<void> {
    const serviceRef = doc(db, 'services', id);
    await deleteDoc(serviceRef);
  },
};

// Servicios de Transacciones
export const transactionService = {
  async createTransaction(transactionData: Omit<Transaction, 'id' | 'createdAt'>): Promise<string> {
    const transactionsRef = collection(db, 'transactions');
    const newTransactionRef = doc(transactionsRef);
    await setDoc(newTransactionRef, {
      ...transactionData,
      id: newTransactionRef.id,
      createdAt: Timestamp.now(),
    });

    // Otorgar experiencia por iniciar una transacción
    await gamificationService.addExperience(transactionData.providerId, 30);
    await gamificationService.addExperience(transactionData.receiverId, 20);
    await gamificationService.updateStreak(transactionData.providerId);
    await gamificationService.updateStreak(transactionData.receiverId);

    return newTransactionRef.id;
  },

  async getTransaction(id: string): Promise<Transaction | null> {
    const transactionRef = doc(db, 'transactions', id);
    const transactionSnap = await getDoc(transactionRef);
    return transactionSnap.exists() ? (transactionSnap.data() as Transaction) : null;
  },

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    const transactionsRef = collection(db, 'transactions');
    const q = query(
      transactionsRef,
      where('providerId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Transaction);
  },

  async updateTransaction(id: string, data: Partial<Transaction>): Promise<void> {
    const transactionRef = doc(db, 'transactions', id);
    const transactionSnap = await getDoc(transactionRef);
    const transaction = transactionSnap.data() as Transaction;

    await updateDoc(transactionRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });

    // Si la transacción se completa, otorgar experiencia adicional
    if (data.status === 'completed' && transaction.status !== 'completed') {
      await gamificationService.addExperience(transaction.providerId, 100);
      await gamificationService.addExperience(transaction.receiverId, 80);
    }
  },
};

// Servicios de Reseñas
export const reviewService = {
  async createReview(reviewData: Omit<Review, 'id' | 'createdAt'>): Promise<string> {
    const reviewsRef = collection(db, 'reviews');
    const newReviewRef = doc(reviewsRef);
    await setDoc(newReviewRef, {
      ...reviewData,
      id: newReviewRef.id,
      createdAt: Timestamp.now(),
    });

    // Otorgar experiencia por dejar una reseña
    await gamificationService.addExperience(reviewData.reviewerId, 40);
    await gamificationService.updateStreak(reviewData.reviewerId);

    // Actualizar la calificación del usuario revisado
    const userRef = doc(db, 'users', reviewData.reviewedId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data() as User;

    const totalReviews = userData.rating * (userData.achievements?.length || 0);
    const newRating = (totalReviews + reviewData.rating) / ((userData.achievements?.length || 0) + 1);

    await updateDoc(userRef, {
      rating: newRating,
      updatedAt: Timestamp.now(),
    });

    return newReviewRef.id;
  },

  async getReviewsByUser(userId: string): Promise<Review[]> {
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, where('reviewedId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Review);
  },
}; 