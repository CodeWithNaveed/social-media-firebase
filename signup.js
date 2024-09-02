import {
    auth,
    createUserWithEmailAndPassword,
} from './firebase.js';

document.getElementById('signupButton').addEventListener('click', (e) => {
    e.preventDefault();

    const userName = document.getElementById('user-name');
    const email = document.getElementById('exampleInputEmail1');
    const password = document.getElementById('exampleInputPassword1');
    const confirmPassword = document.getElementById('exampleInputPassword2');
    const Phone_number = document.getElementById('Phone_number');

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Sign up successful');
            window.location.href = './login/login.html';
        })
        .catch((error) => {
            if (!email.value || !password.value || !Phone_number.value) {
                alert('Please fill in all fields');
                return;
            }
            if (password.value !== confirmPassword.value) {
                alert('Password not matched');
                password = '';
                confirmPassword = '';
                return;
            }
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in use');
                email.value = '';
                return;
            }
            if (error.code === 'auth/weak-password') {
                alert('set a strong password');
                password = '';
                confirmPassword = '';
                return;
            }
            if (error.code === 'auth/invalid-email') {
                alert('Please enter a valid email address');
                email = '';
                return;
            }
        });
});