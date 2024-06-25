import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword ,createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { getFirestore,collection, addDoc,getDocs,doc, deleteDoc,getDoc  } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAJO7mbfJ2vshJ4Guw4vW58Mxll9ODM0sI",
  authDomain: "reacthackathon-126c7.firebaseapp.com",
  projectId: "reacthackathon-126c7",
  storageBucket: "reacthackathon-126c7.appspot.com",
  messagingSenderId: "115906382401",
  appId: "1:115906382401:web:4d52dfc9b9dec01745d4c0",
  measurementId: "G-H96HKQY068"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  database,
  collection,addDoc,getStorage, ref,uploadBytesResumable, getDownloadURL,app,getDocs,doc, deleteDoc,getDoc
};