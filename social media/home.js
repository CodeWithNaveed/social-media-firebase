import { 
  auth, 
  signOut,
  onAuthStateChanged,
} from "../firebase.js";

// --------------logout button----------------
document.getElementById('logoutButton').addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth)
    .then(() => {
        alert('Log out successful');
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error.message);
      // An error happened.
    });
    window.location.href = '../login/login.html';
})

onAuthStateChanged(auth, (user) => {
  if (user) {
      const uid = user.uid;
      console.log('user is login');
      console.log(uid);
  }
  else {
      console.log('user is logout');
  }
});