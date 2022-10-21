import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "chat-app-b6e80.firebaseapp.com",
  projectId: "chat-app-b6e80",
  storageBucket: "chat-app-b6e80.appspot.com",
  messagingSenderId: "647886654415",
  appId: "1:647886654415:web:eca4d85041a617726fe0ba",
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);

enableIndexedDbPersistence(firebaseDb, { forceOwnership: false });
