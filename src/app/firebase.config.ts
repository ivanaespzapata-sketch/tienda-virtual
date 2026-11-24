
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAcfdD-kHRK09il-DqVIbFSDbMcxQRyweQ",
  authDomain: "aurelle-tienda.firebaseapp.com",
  projectId: "aurelle-tienda",
  storageBucket: "aurelle-tienda.firebasestorage.app",
  messagingSenderId: "197179492058",
  appId: "1:197179492058:web:53dc5b37ade7f0e2ab07e3",
  measurementId: "G-7YBW1W90NK"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
