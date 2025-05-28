import { Timestamp } from 'firebase/firestore';

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'transaction' | 'review';
  title: string;
  body: string;
  data?: {
    chatId?: string;
    transactionId?: string;
    [key: string]: any;
  };
  createdAt: Timestamp;
  read: boolean;
}

export interface NotificationSettings {
  message: boolean;
  transaction: boolean;
  review: boolean;
  [key: string]: boolean;
} 