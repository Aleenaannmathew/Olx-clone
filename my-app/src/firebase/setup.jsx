import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDh_zm6A7p0bieieEfQo_GakhE3r87Z-EE",
  authDomain: "olx-clone-59a82.firebaseapp.com",
  projectId: "olx-clone-59a82",
  storageBucket: "olx-clone-59a82.firebasestorage.app",
  messagingSenderId: "1051064466716",
  appId: "1:1051064466716:web:57205ddc3447b0ea914ed9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };  
export const googleProvider = new GoogleAuthProvider()