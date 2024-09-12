import { auth, onAuthStateChanged, logoutButton, saveDataOfUserInFirebase, db, collection, getDoc, onSnapshot, serverTimestamp, query, orderBy, storage, ref, uploadBytesResumable, getDownloadURL, } from "../firebase.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;

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

    let date = new Date();
    let getMilliseconds = date.getMilliseconds();

    const uploadImageToFirebaseStorage = (file) => {
      return new Promise((resolve, reject) => {
        const imageName = file.name
        const storageRef = ref(storage, `images/${getMilliseconds}`);
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

    document.getElementById('postButton').addEventListener('click', async (e) => {
      try {
        const postText = document.getElementById('postTextArea');
        await saveDataOfUserInFirebase('post', { timeStamp: serverTimestamp(), Text: postText.value });
        postText.value = ""
        const file = document.getElementById('photosUploadButton')
        const url = await uploadImageToFirebaseStorage(file.files[0]);
        console.log("url----------> ", url);
      }
      catch (error) {
        console.log(error.message)
      }
    })

    // const file = document.getElementById('photosUploadButton')
    // let imageSrc;

    // file.addEventListener('change', async (e) => {
    //   try {
    //     imageSrc = URL.createObjectURL(e.target.files[0]);
    //   }
    //   catch (error) {
    //     console.log(error.message)
    //   }
    // })


    // ---------------------------------------get data of all post from firebase--------------------------------
    const getDataOfAllpostFromFirebase = async () => {
      const feed = document.getElementById('feed');
      const q = query(collection(db, "post"), orderBy("timeStamp", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        feed.innerHTML = "";
        querySnapshot.forEach((doc) => {
          feed.innerHTML += `
              <li class="post">
                <div class="post-header">
                    <img src="https://picsum.photos/50/50" alt="Profile Picture" class="profile-pic">
                    <h2>Jane Doe</h2>
                </div>
                <br>
                <p id="post-text">${doc.data().Text}</p>
                <img src="" alt="Post Image" id="post-image">
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
    getDataOfAllpostFromFirebase()
  }
  else {
    console.log('user is logout');
    window.location.href = '../index.html';
  }



});