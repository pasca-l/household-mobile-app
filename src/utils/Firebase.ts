import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBP6AehZPKBg8Ugg4C-3JJHmopGR_sMdwQ",
  authDomain: "household-app-921c0.firebaseapp.com",
  projectId: "household-app-921c0",
  storageBucket: "household-app-921c0.appspot.com",
  messagingSenderId: "443616909343",
  appId: "1:443616909343:web:45b1bf3995b41ab73a5d2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
