import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc, orderBy, limit, Timestamp } from 'firebase/firestore';
import app from '../config/firebase';
import type { User, Badge, Achievement, Level, LeaderboardEntry } from '../types/index';

const db = getFirestore(app);

// Configuración de niveles
const LEVELS: Level[] = [
  { level: 1, experienceRequired: 0, rewards: [] },
  { level: 2, experienceRequired: 100, rewards: [{ type: 'badge', value: 'novice' }] },
  { level: 3, experienceRequired: 300, rewards: [{ type: 'achievement', value: 'first_steps' }] },
  { level: 4, experienceRequired: 600, rewards: [{ type: 'bonus', value: 5 }] },
  { level: 5, experienceRequired: 1000, rewards: [{ type: 'badge', value: 'intermediate' }] },
  // Agregar más niveles según sea necesario
];

// Configuración de insignias predefinidas
const PREDEFINED_BADGES: Badge[] = [
  {
    id: 'first_service',
    name: 'Primer Servicio',
    description: 'Ofreció su primer servicio',
    imageUrl: '/badges/first-service.png',
    category: 'service',
    requirements: { type: 'transactions', value: 1 }
  },
  {
    id: 'time_master',
    name: 'Maestro del Tiempo',
    description: 'Acumuló 100 horas de intercambio',
    imageUrl: '/badges/time-master.png',
    category: 'time',
    requirements: { type: 'hours', value: 100 }
  },
  {
    id: 'community_builder',
    name: 'Constructor de Comunidad',
    description: 'Recibió 10 reseñas positivas',
    imageUrl: '/badges/community-builder.png',
    category: 'community',
    requirements: { type: 'reviews', value: 10 }
  },
  // Agregar más insignias según sea necesario
];

// Configuración de logros predefinidos
const PREDEFINED_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'service_master',
    name: 'Maestro de Servicios',
    description: 'Completó 50 servicios',
    experiencePoints: 500,
    category: 'service',
    requirements: { type: 'transactions', value: 50 }
  },
  {
    id: 'time_philanthropist',
    name: 'Filántropo del Tiempo',
    description: 'Donó 200 horas a la comunidad',
    experiencePoints: 1000,
    category: 'time',
    requirements: { type: 'hours', value: 200 }
  },
  // Agregar más logros según sea necesario
];

export const gamificationService = {
  // Gestión de experiencia y niveles
  async addExperience(userId: string, points: number): Promise<void> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data() as User;
    
    const newExperience = userData.experience + points;
    const newLevel = this.calculateLevel(newExperience);
    
    await updateDoc(userRef, {
      experience: newExperience,
      level: newLevel,
      updatedAt: Timestamp.now()
    });

    // Verificar logros y recompensas
    await this.checkAchievements(userId);
    await this.checkBadges(userId);
  },

  calculateLevel(experience: number): number {
    return LEVELS.reduce((currentLevel, level) => {
      return experience >= level.experienceRequired ? level.level : currentLevel;
    }, 1);
  },

  // Gestión de insignias
  async checkBadges(userId: string): Promise<void> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data() as User;

    const userStats = await this.getUserStats(userId);
    const newBadges: Badge[] = [];

    PREDEFINED_BADGES.forEach(badge => {
      if (!userData.badges.some(b => b.id === badge.id)) {
        const hasEarned = this.checkBadgeRequirements(badge, userStats);
        if (hasEarned) {
          newBadges.push({ ...badge, earnedAt: new Date() });
        }
      }
    });

    if (newBadges.length > 0) {
      await updateDoc(userRef, {
        badges: [...userData.badges, ...newBadges],
        updatedAt: Timestamp.now()
      });
    }
  },

  // Gestión de logros
  async checkAchievements(userId: string): Promise<void> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data() as User;

    const userStats = await this.getUserStats(userId);
    const newAchievements: Achievement[] = [];

    PREDEFINED_ACHIEVEMENTS.forEach(achievement => {
      if (!userData.achievements.some(a => a.id === achievement.id)) {
        const hasCompleted = this.checkAchievementRequirements(achievement, userStats);
        if (hasCompleted) {
          newAchievements.push({ ...achievement, completedAt: new Date() });
          // Otorgar puntos de experiencia por el logro
          this.addExperience(userId, achievement.experiencePoints);
        }
      }
    });

    if (newAchievements.length > 0) {
      await updateDoc(userRef, {
        achievements: [...userData.achievements, ...newAchievements],
        updatedAt: Timestamp.now()
      });
    }
  },

  // Gestión de rachas
  async updateStreak(userId: string): Promise<void> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data() as User;

    const today = new Date();
    const lastActivity = userData.lastActivityDate ? new Date(userData.lastActivityDate) : null;
    
    let newStreak = userData.streak;
    
    if (lastActivity) {
      const daysSinceLastActivity = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastActivity === 1) {
        newStreak += 1;
      } else if (daysSinceLastActivity > 1) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    await updateDoc(userRef, {
      streak: newStreak,
      lastActivityDate: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  },

  // Tablas de clasificación
  async getLeaderboard(category: 'time' | 'services' | 'community', limit: number = 10): Promise<LeaderboardEntry[]> {
    const usersRef = collection(db, 'users');
    let q;

    switch (category) {
      case 'time':
        q = query(usersRef, orderBy('timeBalance', 'desc'), limit(limit));
        break;
      case 'services':
        q = query(usersRef, orderBy('level', 'desc'), limit(limit));
        break;
      case 'community':
        q = query(usersRef, orderBy('rating', 'desc'), limit(limit));
        break;
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc, index) => {
      const userData = doc.data() as User;
      return {
        userId: doc.id,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        score: this.getScoreForCategory(userData, category),
        rank: index + 1,
        category
      };
    });
  },

  // Funciones auxiliares
  getUserStats: async function(userId: string): Promise<{
    totalTransactions: number;
    totalHours: number;
    totalReviews: number;
    currentStreak: number;
  }> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data() as User;

    return {
      totalTransactions: userData.transactions?.length || 0,
      totalHours: userData.timeBalance || 0,
      totalReviews: userData.reviews?.length || 0,
      currentStreak: userData.streak || 0
    };
  },

  checkBadgeRequirements: function(badge: Badge, stats: any): boolean {
    switch (badge.requirements.type) {
      case 'transactions':
        return stats.totalTransactions >= badge.requirements.value;
      case 'hours':
        return stats.totalHours >= badge.requirements.value;
      case 'reviews':
        return stats.totalReviews >= badge.requirements.value;
      case 'streak':
        return stats.currentStreak >= badge.requirements.value;
      default:
        return false;
    }
  },

  checkAchievementRequirements: function(achievement: Achievement, stats: any): boolean {
    switch (achievement.requirements.type) {
      case 'transactions':
        return stats.totalTransactions >= achievement.requirements.value;
      case 'hours':
        return stats.totalHours >= achievement.requirements.value;
      case 'reviews':
        return stats.totalReviews >= achievement.requirements.value;
      case 'streak':
        return stats.currentStreak >= achievement.requirements.value;
      case 'level':
        return stats.level >= achievement.requirements.value;
      default:
        return false;
    }
  },

  getScoreForCategory: function(user: User, category: 'time' | 'services' | 'community'): number {
    switch (category) {
      case 'time':
        return user.timeBalance;
      case 'services':
        return user.level;
      case 'community':
        return user.rating;
      default:
        return 0;
    }
  }
}; 