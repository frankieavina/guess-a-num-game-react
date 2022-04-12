// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALeR0UB--Zy_1ARM_wSn11aGSsdgn2Hqg",
  authDomain: "react-bitwise-guess-a-num-game.firebaseapp.com",
  databaseURL: "https://react-bitwise-guess-a-num-game-default-rtdb.firebaseio.com",
  projectId: "react-bitwise-guess-a-num-game",
  storageBucket: "react-bitwise-guess-a-num-game.appspot.com",
  messagingSenderId: "612230863207",
  appId: "1:612230863207:web:166d764ed6bb2371e8b7c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export db 
const db = getFireStore(app);  

export { db }
