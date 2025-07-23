// src/contexts/FirebaseContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [firestoreDb, setFirestoreDb] = useState(null);
  const [firebaseAuth, setFirebaseAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingFirebase, setLoadingFirebase] = useState(true);

  useEffect(() => {
    try {
      // Firebase configuration - retrieve from environment variables
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID // Optional, if using Analytics
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);

      setFirebaseApp(app);
      setFirestoreDb(db);
      setFirebaseAuth(auth);

      // Anonymous authentication
      signInAnonymously(auth)
        .then((userCredential) => {
          setUser(userCredential.user);
          console.log("Signed in anonymously:", userCredential.user.uid);
        })
        .catch((error) => {
          console.error("Error signing in anonymously:", error);
        })
        .finally(() => {
          setLoadingFirebase(false);
        });

    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
      setLoadingFirebase(false);
    }
  }, []);

  // Function to save a generated plan
  const saveGeneratedPlan = async (userInput, aiOutput) => {
    if (!firestoreDb || !user) {
      console.error("Firestore or user not initialized.");
      return null;
    }
    try {
      // *** IMPORTANT CHANGE HERE: Collection name changed from "generated_plans" to "generatedPlans" ***
      const docRef = await addDoc(collection(firestoreDb, "generatedPlans"), {
        userId: user.uid,
        userInput: userInput,
        aiOutput: aiOutput,
        timestamp: serverTimestamp(),
        // Add any other relevant metadata here
        // e.g., appVersion, modelUsed (OpenAI), etc.
      });
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  };

  const value = {
    firebaseApp,
    firestoreDb,
    firebaseAuth,
    user,
    loadingFirebase,
    saveGeneratedPlan,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loadingFirebase ? children : <div className="text-center py-10">Loading application...</div>}
    </FirebaseContext.Provider>
  );
};
