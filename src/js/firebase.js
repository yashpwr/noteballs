import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA29deuOLkb8N29vJ7JeU8oEuAgmwZYDek',
  authDomain: 'noteballs-b128c.firebaseapp.com',
  projectId: 'noteballs-b128c',
  storageBucket: 'noteballs-b128c.appspot.com',
  messagingSenderId: '489711586122',
  appId: '1:489711586122:web:2c0c423705145441250fb3'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth
}
