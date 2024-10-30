import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDHlvvnnm-acBRBO5RI0RqWGnr1pwjNviI",
    authDomain: "form-fire-country.firebaseapp.com",
    databaseURL: "https://form-fire-country-default-rtdb.firebaseio.com",
    projectId: "form-fire-country",
    storageBucket: "form-fire-country.appspot.com",
    messagingSenderId: "96220126500",
    appId: "1:96220126500:web:d7fcf98c77952c279467b1"
  };
  const app =initializeApp(firebaseConfig);
const db = getFirestore(app);
  export default db;
 