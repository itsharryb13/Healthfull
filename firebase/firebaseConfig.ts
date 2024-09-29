import * as firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAjzZLLvFZaI3_ipGQV8zvCGRC5M4cr2gw",
  authDomain: "healthful-bb936.firebaseapp.com",
  databaseURL: "https://healthful-bb936-default-rtdb.firebaseio.com",
  projectId: "healthful-bb936",
  storageBucket: "healthful-bb936.appspot.com",
  messagingSenderId: "173986976536",
  appId: "1:173986976536:web:29c123aa5c1c7b41e1846d",
  measurementId: "G-85DY0VSMNJ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default app;