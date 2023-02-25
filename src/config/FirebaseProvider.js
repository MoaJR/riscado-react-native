import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbgLkLm_cOlb3IPrhsGOuXfC9kvcNN-yk",
  authDomain: "riscado-app.firebaseapp.com",
  projectId: "riscado-app",
  storageBucket: "riscado-app.appspot.com",
  messagingSenderId: "124110277680",
  appId: "1:124110277680:web:36cd60a74d7d2907a971f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);