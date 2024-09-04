import { auth, onAuthStateChanged, logoutButton, saveDataOfUserInFirebase} from "../firebase.js";

let UID;

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("user is login: ", uid);

    document.getElementById('logoutButton').addEventListener('click',async (e) => {
      e.preventDefault();

      try {
        const logoutBtn = await logoutButton(auth);
        window.location.href = '../social media/home.html';
      }
      catch (error) {
        console.log(error.message)
      }
    })

    document.getElementById('postButton').addEventListener('click', async (e) => {
      e.preventDefault();

      const postText = document.getElementById('postText').value;
      const photosUploadButton = document.getElementById('photosUploadButton');
      const photos = photosUploadButton.files;
      // console.log(postText, URL.createObjectURL(photos[0]));

      try {
        const savePostData = await saveDataOfUserInFirebase('post', uid, { postText});
        console.log(savePostData);
      }
      catch (error) {
        console.log(error.message)
      }
    })
  }
  else {
    console.log('user is logout');
    window.location.href = '../index.html';
  }
});