import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzyMZj0wPOg-fQZR8014wB8gbE8Cspiok",
  authDomain: "dotnet-api-4424a.firebaseapp.com",
  projectId: "dotnet-api-4424a",
  storageBucket: "dotnet-api-4424a.firebasestorage.app",
  messagingSenderId: "710960886507",
  appId: "1:710960886507:web:dcb6723c941179b83a04ae",
  measurementId: "G-F2T0YGTPLW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
