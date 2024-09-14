import { auth, onAuthStateChanged, logoutButton, saveDataOfPostINFirebaseFirestore, db, doc, collection, getDoc, onSnapshot, serverTimestamp, query, orderBy, storage, ref, uploadBytesResumable, getDownloadURL, } from "../firebase.js";

let UID;
let UEMAIL;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // --------------------------User uid-------------------------------------------------
    const uid = user.uid;
    const makeUserName = (email) => {
      const userNameFromEmail = email.split('@')[0];
      const userName = userNameFromEmail[0].toUpperCase() + userNameFromEmail.slice(1).toLowerCase();
      return userName;
    }
    
    const uemail = makeUserName(user.email);
    const userName = document.getElementsByClassName("userName")
    userName[0].innerHTML = UEMAIL;

    UID = uid;
    UEMAIL = uemail;

    // --------------------------User name------------------------------------------------

  }
  else {
    console.log('user is logout');
    window.location.href = '../index.html';
  }
});

// --------------------------Logout button--------------------------------------------
document.getElementById('logoutButton').addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    await logoutButton(auth);
    window.location.href = '../index.html';
  }
  catch (error) {
    console.log(error.message)
  }
})

// --------------------------Upload image in firebase storage------------------------
const uploadImageToFirebaseStorage = (file) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${UEMAIL}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        reject(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL)
        });
      }
    );
  })
}

// --------------------------Create URL of image file by Firebase-------------------------
let url;
const fileOfImage = document.getElementById('photosUploadButton');
fileOfImage.addEventListener('change', async (e) => {
  url = await uploadImageToFirebaseStorage(e.target.files[0])
  setTimeout(() => {
    console.log("url=====> ", url)
  }, 5000)
})

// --------------------------Post button--------------------------------------------------
document.getElementById('postButton').addEventListener('click', async () => {
  try {
    const postTextArea = document.getElementById('postTextArea');
    await saveDataOfPostINFirebaseFirestore('post', { timeStamp: serverTimestamp(), Text: postTextArea.value, name: UEMAIL, postPhoto: url });
    postTextArea.value = ""
  }
  catch (error) {
    console.log(error.message)
  }
})

// ---------------------------------------get data of all post from firebase--------------------------------
const getDataOfAllpostFromFirebaseFirestore = async () => {
  const feed = document.getElementById('feed');
  const q = await query(collection(db, "post"), orderBy("timeStamp", "desc"));
  const unsubscribe = await onSnapshot(q, async (querySnapshot) => {
    feed.innerHTML = "";
    await querySnapshot.forEach(async (postDoc) => {
      feed.innerHTML += `
              <li class="post">
                <div class="post-header">
                    <img src="https://picsum.photos/50/50" alt="Profile Picture" class="profile-pic">
                    <h2>${postDoc.data().name}</h2>
                </div>
                <br>
                <p id="post-text">${postDoc.data().Text}</p>
                <img src="${postDoc.data().postPhoto}" alt="Post Image" id="post-image">
                <div class="post-footer">
                    <button class="button postButton"><i class="fa-solid fa-thumbs-up"></i>Like</button>
                    <button class="button postButton"><i class="fa-regular fa-comment-dots"></i>Comment</button>
                    <button class="button postButton"><i class="fa-solid fa-share"></i>Share</button>
                </div>
              </li>
            `
    });
  });
}

setTimeout(() => {
  getDataOfAllpostFromFirebaseFirestore();
}, 5000)







