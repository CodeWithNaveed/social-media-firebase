import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup, 
    GoogleAuthProvider,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyATTRzqGgNVcI8cyE9TzJndclQ9AQb6LJI",
    authDomain: "fir-2218e.firebaseapp.com",
    projectId: "fir-2218e",
    storageBucket: "fir-2218e.appspot.com",
    messagingSenderId: "384023233689",
    appId: "1:384023233689:web:95894587839a14f0f82408",
    measurementId: "G-NCM910T2KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();


export { 
    app, 
    auth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup, 
    GoogleAuthProvider,
    googleprovider,
    onAuthStateChanged,
};
