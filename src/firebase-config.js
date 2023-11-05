// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC81zFnrGunTfEd-pUmHAAi7IvUz54bBQ0",
  authDomain: "realtime-app-chat-d3d35.firebaseapp.com",
  projectId: "realtime-app-chat-d3d35",
  storageBucket: "realtime-app-chat-d3d35.appspot.com",
  messagingSenderId: "651980889248",
  appId: "1:651980889248:web:67ee6a3df42cd38278fdc5",
  measurementId: "G-7LE80S9GEC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
