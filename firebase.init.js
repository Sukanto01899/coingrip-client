// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: "money-transper-app.firebaseapp.com",
  projectId: "money-transper-app",
  storageBucket: "money-transper-app.appspot.com",
  messagingSenderId: "483562373112",
  appId: "1:483562373112:web:fc9c3c0b47992ffa34e00d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// AUTH
const auth = getAuth(app)

export default auth