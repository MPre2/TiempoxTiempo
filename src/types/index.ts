// Tipos principales
import type { NotificationSettings } from './notification';

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'service' | 'community' | 'time' | 'special';
  requirements: {
    type: 'transactions' | 'hours' | 'reviews' | 'streak';
    value: number;
  };
  earnedAt?: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  experiencePoints: number;
  category: 'service' | 'community' | 'time' | 'special';
  requirements: {
    type: 'transactions' | 'hours' | 'reviews' | 'streak' | 'level';
    value: number;
  };
  completedAt?: Date;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  timeBalance: number;
  rating: number;
  skills: string[];
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  level: number;
  experience: number;
  badges: Badge[];
  achievements: Achievement[];
  streak: number;
  lastActivityDate: Date;
  location?: Location;
  fcmToken?: string;
  notificationSettings: NotificationSettings;
  online: boolean;
  lastSeen: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  timeValue: number;
  providerId: string;
  providerName: string;
  status: 'active' | 'inactive' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  location: Location;
  radius: number;
  availability: Availability[];
}

export interface Transaction {
  id: string;
  serviceId: string;
  serviceTitle: string;
  providerId: string;
  providerName: string;
  receiverId: string;
  receiverName: string;
  timeValue: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
  location: Location;
  meetingTime?: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  country?: string;
}

export interface Availability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface Level {
  level: number;
  experienceRequired: number;
  rewards: {
    type: 'badge' | 'achievement' | 'bonus';
    value: string | number;
  }[];
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  photoURL?: string;
  score: number;
  rank: number;
  category: 'time' | 'services' | 'community';
}

// Reexportar tipos específicos
export type { Chat, Message } from './chat';
export type { Notification, NotificationSettings } from './notification';
export type { Review } from './review'; 