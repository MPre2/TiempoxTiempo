import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc, orderBy, limit, Timestamp, onSnapshot } from 'firebase/firestore';
import app from '../config/firebase';
import type { User } from '../types';
import type { Notification, NotificationSettings } from '../types/notification';
import { getMessaging, getToken } from 'firebase/messaging';

const db = getFirestore(app);
const messaging = getMessaging(app);

export const notificationService = {
  // Gestión de notificaciones
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<string> {
    const notificationsRef = collection(db, 'notifications');
    const newNotificationRef = doc(notificationsRef);
    const now = Timestamp.now();

    const newNotification: Notification = {
      ...notification,
      id: newNotificationRef.id,
      createdAt: now,
      read: false
    };

    await setDoc(newNotificationRef, newNotification);

    // Verificar configuración de notificaciones del usuario
    const userRef = doc(db, 'users', notification.userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data() as User;

    if (userData.notificationSettings[notification.type] && userData.fcmToken) {
      await this.sendPushNotification(userData.fcmToken, newNotification);
    }

    return newNotificationRef.id;
  },

  async getNotifications(userId: string, limit: number = 50): Promise<Notification[]> {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limit)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Notification);
  },

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      read: true
    });
  },

  async markAllNotificationsAsRead(userId: string): Promise<void> {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', userId),
      where('read', '==', false)
    );
    const querySnapshot = await getDocs(q);
    
    const batch = db.batch();
    querySnapshot.docs.forEach(doc => {
      batch.update(doc.ref, { read: true });
    });
    await batch.commit();
  },

  // Gestión de configuración de notificaciones
  async updateNotificationSettings(userId: string, settings: Partial<NotificationSettings>): Promise<void> {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      notificationSettings: settings,
      updatedAt: Timestamp.now()
    });
  },

  // Gestión de tokens FCM
  async updateFCMToken(userId: string, token: string): Promise<void> {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      fcmToken: token,
      updatedAt: Timestamp.now()
    });
  },

  async getFCMToken(): Promise<string | null> {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        return await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
        });
      }
      return null;
    } catch (error) {
      console.error('Error al obtener el token FCM:', error);
      return null;
    }
  },

  // Envío de notificaciones push
  sendPushNotification: async function(token: string, notification: Notification): Promise<void> {
    try {
      const message = {
        token,
        notification: {
          title: notification.title,
          body: notification.body
        },
        data: notification.data || {},
        webpush: {
          fcmOptions: {
            link: this.getNotificationLink(notification)
          }
        }
      };

      // Aquí deberías implementar la lógica para enviar la notificación push
      // usando Firebase Cloud Functions o un servicio de terceros
      console.log('Enviando notificación push:', message);
    } catch (error) {
      console.error('Error al enviar notificación push:', error);
    }
  },

  getNotificationLink: function(notification: Notification): string {
    switch (notification.type) {
      case 'message':
        return `/chat/${notification.data?.chatId}`;
      case 'transaction':
        return `/transactions/${notification.data?.transactionId}`;
      case 'review':
        return `/profile`;
      default:
        return '/';
    }
  },

  // Suscripción a notificaciones en tiempo real
  subscribeToNotifications(userId: string, callback: (notifications: Notification[]) => void) {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    return onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map(doc => doc.data() as Notification);
      callback(notifications);
    });
  }
}; 