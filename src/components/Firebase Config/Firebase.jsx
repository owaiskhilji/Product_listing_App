// Firebase.js
import React from 'react';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
import Admin from '../components/Admin'; // Adjust the path as needed
import firebaseApp from './firebaseConfig'; // Import the Firebase configuration
const db = getFirestore(firebaseApp);
const Firebase = () => {
  const q = collection(db, "users");
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  });
 const writeUserData = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        username: 'sara',
        email: 'sara@',
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  writeUserData();
  return (
    <div>
      <Admin />
    </div>
  );
};
export default Firebase;
