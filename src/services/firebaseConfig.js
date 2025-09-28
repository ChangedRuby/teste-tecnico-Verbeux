import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_s7UOuNPitBtxSoHjtkovgNLnT3yLm04",
  authDomain: "teste-tecnico-verbeux.firebaseapp.com",
  projectId: "teste-tecnico-verbeux",
  storageBucket: "teste-tecnico-verbeux.firebasestorage.app",
  messagingSenderId: "197182069571",
  appId: "1:197182069571:web:569e00e7e0bc32849d6df6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);