import { auth, loginFormForUser, loginByGoogle} from "../firebase.js";

// --------------------------------Login button-----------------------------------------------
document.getElementById('loginButton').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('exampleInputEmail1').value;
    const password = document.getElementById('exampleInputPassword1').value;

    try {
        const uid = await loginFormForUser(auth, email, password)
        // console.log(uid, "==>> uid");
        window.location.href = '../social media/home.html';
    }
    catch (error) {
        console.log(error.message);
        if(!email || !password) {
            alert('Please enter email and password first.');
            return;
        }
        if(error.code === 'auth/invalid-credential') {
            alert('Please signup first.');
            email.value = '';
            password.value = '';
            return;
        }
    }
})

// --------------------------------google login button----------------------------------------
document.getElementById('loginWithGoogle').addEventListener('click', async (e) => {
    e.preventDefault();

    try {
        const uidByGoogle = await loginByGoogle(auth);
        window.location.href = '../social media/home.html';
    }
    catch (error) {
        console.log(error.message);
    }
})