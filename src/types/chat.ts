import { Timestamp } from 'firebase/firestore';

export interface Chat {
  id: string;
  participants: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastMessage?: Message;
  unreadCount: {
    [userId: string]: number;
  };
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: Timestamp;
  read: boolean;
  type: 'text' | 'location' | 'image' | 'file';
  metadata?: {
    location?: {
      latitude: number;
      longitude: number;
    };
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
  };
} 