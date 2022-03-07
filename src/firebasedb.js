// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {setDoc, updateDoc, getDocs, collection, getFirestore, addDoc, doc, onSnapshot } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJg0U5gah6QVryoECIn277jbdybluuz8M",
  authDomain: "whatsapp-719b9.firebaseapp.com",
  projectId: "whatsapp-719b9",
  storageBucket: "whatsapp-719b9.appspot.com",
  messagingSenderId: "176452640616",
  appId: "1:176452640616:web:4789ac6e3481968db800dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {setDoc, updateDoc, getDocs, collection, getFirestore, addDoc, doc, onSnapshot}
export default db;