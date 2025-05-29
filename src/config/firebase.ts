import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.replace(/['"]+/g, ''+/,/g, '').replace(/,/g, ''),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.replace(/['"]+/g, '').replace(/,/g, ''),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.replace(/['"]+/g, '').replace(/,/g, ''),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.replace(/['"]+/g, '').replace(/,/g, ''),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.replace(/['"]+/g, '').replace(/,/g, ''),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.replace(/['"]+/g, '').replace(/,/g, '')
};

// Log de la configuración
// ************************************************
// AÑADE ESTOS CONSOLE.LOG JUSTO AQUÍ
console.log("--> Inspeccionando firebaseConfig ANTES de inicializar Firebase:");
console.log("firebaseConfig entero:", firebaseConfig);
console.log("Valor de apiKey:", firebaseConfig.apiKey);
console.log("Tipo de apiKey:", typeof firebaseConfig.apiKey);
console.log("Valor de appId:", firebaseConfig.appId);
console.log("Tipo de appId:", typeof firebaseConfig.appId);
console.log("Valor de projectId:", firebaseConfig.projectId);
console.log("Tipo de projectId:", typeof firebaseConfig.projectId);
console.log("<-- Fin de la inspección");
// ************************************************

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth
export const auth = getAuth(app);

// Inicializar Firestore
export const db = getFirestore(app);

// Configuración de Firestore para desarrollo
if (import.meta.env.DEV) {
  // Habilitar persistencia offline
  import('firebase/firestore').then(({ enableIndexedDbPersistence }) => {
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Persistencia fallida: múltiples pestañas abiertas');
      } else if (err.code === 'unimplemented') {
        console.warn('Persistencia no disponible en este navegador');
      }
    });
  });
}

export default app;