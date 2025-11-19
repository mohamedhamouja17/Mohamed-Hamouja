
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXP45xTDcFnduCQkKhjvYWmRh85hHYoQE",
  authDomain: "walzoo.firebaseapp.com",
  projectId: "walzoo",
  storageBucket: "walzoo.firebasestorage.app",
  messagingSenderId: "561524293006",
  appId: "1:561524293006:web:1e6017f858974dffa2f8df",
  measurementId: "G-733535BHX5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
