import {
    auth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    googleprovider,
    onAuthStateChanged,
} from "../firebase.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('user is login');
          window.location.href = '../social media/home.html';
    } else {
        console.log("user is logout");
    }
});

document.getElementById('loginButton').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('exampleInputEmail1');
    const password = document.getElementById('exampleInputPassword1');

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            alert(`user login successfully`);
            window.location.href = '../social media/home.html';
        })
        .catch((error) => {
            if (!email.value || !password.value) {
                alert('Please fill in all fields');
                return;
            }
            if (error.code === 'auth/invalid-email') {
                alert('Please enter a valid email address');
                email.value = '';
                return;
            }
            if (error.code === 'auth/wrong-password') {
                alert('Wrong password');
                password.value = '';
                return;
            }
            if (error.code === 'auth/invalid-credential') {
                alert('User not found');
                email.value = '';
                password.value = '';
                return;
            }
        });
})

document.getElementById('loginWithGoogle').addEventListener('click', (e) => {
    e.preventDefault();

    signInWithPopup(auth, googleprovider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("token", token);
            console.log("user", user);
            alert('Log in successful');
            window.location.href = '../social media/home.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("error", errorCode, credential);
        });
})