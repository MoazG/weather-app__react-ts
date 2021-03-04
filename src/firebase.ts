import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (
  user: firebase.User,
  additionalData: { [key: string]: any }
) => {
  if (!user) {
    return null;
  }
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Failed to create user", error.message);
    }
  }
};

export const getUserDocument = async (uuid: string) => {
  if (!uuid) {
    return null;
  }
  try {
    return firestore.collection("users").doc(uuid);
  } catch (error) {
    console.log("Error fetching user", error.message);
  }
};

export const firestore = firebase.firestore();
export default firebase;
