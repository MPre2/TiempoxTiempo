import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc, orderBy, limit, Timestamp, onSnapshot } from 'firebase/firestore';
import app from '../config/firebase';
import type { Chat, Message } from '../types/chat';
import { notificationService } from './notifications';

const db = getFirestore(app);

export const messagingService = {
  // Gestión de chats
  async createChat(participants: string[]): Promise<string> {
    const chatsRef = collection(db, 'chats');
    const newChatRef = doc(chatsRef);
    const now = Timestamp.now();
    
    const chat: Chat = {
      id: newChatRef.id,
      participants,
      createdAt: now,
      updatedAt: now,
      unreadCount: participants.reduce((acc, userId) => ({ ...acc, [userId]: 0 }), {})
    };

    await setDoc(newChatRef, chat);
    return newChatRef.id;
  },

  async getChat(chatId: string): Promise<Chat | null> {
    const chatRef = doc(db, 'chats', chatId);
    const chatSnap = await getDoc(chatRef);
    return chatSnap.exists() ? (chatSnap.data() as Chat) : null;
  },

  async getUserChats(userId: string): Promise<Chat[]> {
    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', userId),
      orderBy('updatedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Chat);
  },

  // Gestión de mensajes
  async sendMessage(chatId: string, message: Omit<Message, 'id' | 'createdAt' | 'read'>): Promise<string> {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const newMessageRef = doc(messagesRef);
    const now = Timestamp.now();

    const newMessage: Message = {
      ...message,
      id: newMessageRef.id,
      createdAt: now,
      read: false
    };

    await setDoc(newMessageRef, newMessage);

    // Actualizar el chat
    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {
      lastMessage: newMessage,
      updatedAt: now,
      [`unreadCount.${message.senderId}`]: 0
    });

    // Incrementar contador de mensajes no leídos para otros participantes
    const chat = await this.getChat(chatId);
    if (chat) {
      const updates = chat.participants
        .filter(id => id !== message.senderId)
        .reduce((acc, userId) => ({
          ...acc,
          [`unreadCount.${userId}`]: (chat.unreadCount[userId] || 0) + 1
        }), {});

      await updateDoc(chatRef, updates);

      // Enviar notificaciones
      for (const userId of chat.participants) {
        if (userId !== message.senderId) {
          await notificationService.createNotification({
            userId,
            type: 'message',
            title: message.senderName,
            body: message.content,
            data: { chatId }
          });
        }
      }
    }

    return newMessageRef.id;
  },

  async getMessages(chatId: string, limit: number = 50): Promise<Message[]> {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(limit));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Message).reverse();
  },

  async markMessagesAsRead(chatId: string, userId: string): Promise<void> {
    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {
      [`unreadCount.${userId}`]: 0
    });

    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(
      messagesRef,
      where('read', '==', false),
      where('senderId', '!=', userId)
    );
    const querySnapshot = await getDocs(q);
    
    const batch = db.batch();
    querySnapshot.docs.forEach(doc => {
      batch.update(doc.ref, { read: true });
    });
    await batch.commit();
  },

  // Suscripción a mensajes en tiempo real
  subscribeToMessages(chatId: string, callback: (messages: Message[]) => void) {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(50));
    
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => doc.data() as Message).reverse();
      callback(messages);
    });
  },

  // Suscripción a chats en tiempo real
  subscribeToUserChats(userId: string, callback: (chats: Chat[]) => void) {
    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', userId),
      orderBy('updatedAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map(doc => doc.data() as Chat);
      callback(chats);
    });
  }
}; 