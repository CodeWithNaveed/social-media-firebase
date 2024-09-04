import { auth, signupFormForUser, saveDataOfUserFromSignupForm } from '../firebase.js';

document.getElementById('signupButton').addEventListener('click', async (e) => {
    e.preventDefault();

    const userName = document.getElementById('user-name').value;
    const email = document.getElementById('exampleInputEmail1').value;
    const password = document.getElementById('exampleInputPassword1').value;
    const confirmPassword = document.getElementById('exampleInputPassword2').value;
    const Phone_number = document.getElementById('Phone_number').value;

    console.log(userName, email, password, confirmPassword, Phone_number);

    try {
        const uid = await signupFormForUser(auth, email, password);
        // console.log("User registered with UID: ", uid);

        const savingUserData = await saveDataOfUserFromSignupForm('users', uid, { userName, email, Phone_number })
        // console.log("savingUserData: ", savingUserData);

        window.location.href = "../index.html";
    }
    catch (error) {
        console.log(error.message);
    }
});