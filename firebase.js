import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, doc, setDoc, addDoc, collection, query, where, getDocs, getDoc, onSnapshot, } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


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
const db = getFirestore(app);

const signupFormForUser = async (auth, email, password) => {
    console.log(email, password)

    const { user: { uid } } = await createUserWithEmailAndPassword(auth, email, password)
    return uid
}

const saveDataOfUserFromSignupForm = async (collectionName, uid, data) => {
    console.log(collectionName, uid, data)

    try {
        await setDoc(doc(db, collectionName, uid.toString()), data);
    } catch (error) {
        console.log(error)
        console.log(error.message)
    }
}

const loginFormForUser = async (auth, email, password) => {
    console.log(email, password)

    const { user: { uid } } = await signInWithEmailAndPassword(auth, email, password)
    return uid
}

const loginByGoogle = async (auth) => {
    try {
        const loginThroughGoogle = await signInWithPopup(auth, googleprovider)
    }
    catch (error) {
        console.log(error.message);
    }
}

const logoutButton = async (auth) => {
    try {
        const userLoginStatus = await signOut(auth);
    }
    catch (error) {
        console.log(error.message);
    }
}

const saveDataOfUserInFirebase = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id + " " + data.Text);
    }
    catch (error) {
        console.log(error.message)
    }
}


 
 
 
   
    



// const saveDataOfUserInFirebase = async (collectionName, uid, data) => {
//     try {
//         await setDoc(doc(db, collectionName, uid), data);
//     }
//     catch (error) {
//         console.log(error.message)
//     }
//     // const userMultiplePostSaver = await setDoc(doc(db, collectionName, uid), data);
// }

// const getMultipleDataFromFirebase = async (collectionName) => {

//     try {
//         const q = query(collection(db, collectionName))  //, where("capital", "==", true));
//         const dataOfPost = []
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             // console.log(doc.id, " => ", doc.data().postText);
//             dataOfPost.push(doc.data().postText.toString())
//         });

//         // return data for our function
//         return dataOfPost[0]
//     }
//     catch (error) {
//         console.log(error.message)
//     }
// }


export {
    app,
    auth,
    signupFormForUser,
    saveDataOfUserFromSignupForm,
    loginFormForUser,
    loginByGoogle,
    onAuthStateChanged,
    logoutButton,
    saveDataOfUserInFirebase,
    db,
    doc,
    collection,
    getDoc, 
    onSnapshot,
};
