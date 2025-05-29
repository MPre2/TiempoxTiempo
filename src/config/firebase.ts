import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.replace(/"/g, ''),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.replace(/"/g, ''),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.replace(/"/g, ''),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.replace(/"/g, ''),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.replace(/"/g, ''),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.replace(/"/g, '')
};

// Verificar que la API key esté presente
if (!firebaseConfig.apiKey) {
  console.error('Firebase API Key no encontrada. Verifica tu archivo .env');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 