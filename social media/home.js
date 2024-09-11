import { auth, onAuthStateChanged, logoutButton, saveDataOfUserInFirebase, db, collection, getDoc, onSnapshot, } from "../firebase.js";

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

    document.getElementById('postButton').addEventListener('click', async (e) => {
      e.preventDefault();

      try {
        const postText = document.getElementById('postTextArea');
        const postDataSend = await saveDataOfUserInFirebase('post', { Text: postText.value });
        postText.value = ""
      }
      catch (error) {
        console.log(error.message)
      }
    })

    let getDataOfAllpostFromFirebase = async () => {
      const response = collection(db, "post");
      let feed = document.getElementById('feed');
      const unsubscribe = onSnapshot(response, (querySnapshot) => {
        // const posts = [];

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
                <img src="https://picsum.photos/500/300" alt="Post Image" id="post-image">
                <div class="post-footer">
                    <button class="button postButton"><i class="fa-solid fa-thumbs-up"></i>Like</button>
                    <button class="button postButton"><i class="fa-regular fa-comment-dots"></i>Comment</button>
                    <button class="button postButton"><i class="fa-solid fa-share"></i>Share</button>
                </div>
              </li>
            `

          // posts.push(doc.data());
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