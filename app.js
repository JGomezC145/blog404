// Firebase Config
var uid;
var firebaseConfig = {
    apiKey: "AIzaSyDH2P75Fb2zZG8eiFMnXbaIX3ORWQOZ8eg",
    authDomain: "s4lblog1.firebaseapp.com",
    databaseURL: "https://s4lblog1.firebaseio.com",
    projectId: "s4lblog1",
    storageBucket: "s4lblog1.appspot.com",
    messagingSenderId: "1029776666754",
    appId: "1:1029776666754:web:340a2fea9be8e3ef01849b",
    measurementId: "G-FKGY1446R0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let postCollection = document.querySelector("#posts-collection");

//variables
const db = firebase.firestore();
const storage = firebase.storage();
var storageRef = storage.ref();

//Create Post
function createPost(title, time, content, imgsource, id, likes) {

  let div = document.createElement("div");
  div.setAttribute("class", "col-md-4");
  let yikes = document.createElement("div");
  let card = document.createElement("div");
  let cardbody = document.createElement("div");
  let idcontainer = document.createElement("p");
  idcontainer.setAttribute("style", "display: none")
  card.setAttribute("class", "card")
  cardbody.setAttribute("class", "card-body")
  yikes.setAttribute("style", "display: flex; justify-content: right;");

  let h2 = document.createElement("h2");
  let p = document.createElement("p");
  let small = document.createElement("small");
  let img = document.createElement("img");
  let likescounter = document.createElement("p");
  let heart = document.createElement("i")
  heart.setAttribute("class", "bx bxs-heart")
  heart.setAttribute("style", "margin-top: 5px; margin-right: 3px;")

  img.setAttribute("class", "card-img-top");
  h2.setAttribute("class", "card-title");
  p.setAttribute("class", "card-text");
  small.setAttribute("class", "card-subtitle mb-2 text-muted");

  img.src = imgsource;
  h2.textContent = title;
  small.textContent = "Posted on: " + time;
  p.textContent = content;
  idcontainer.textContent = id;
  likescounter.textContent = likes;


  yikes.appendChild(heart);
  yikes.appendChild(likescounter);

  cardbody.appendChild(h2);
  cardbody.appendChild(small);
  cardbody.appendChild(p);
  cardbody.appendChild(yikes);

  card.appendChild(img);
  card.appendChild(cardbody)

  div.appendChild(card);


  // div.appendChild(img);
  // div.appendChild(h2);
  // div.appendChild(small);
  // div.appendChild(p);
  // div.appendChild(yikes);


  postCollection.appendChild(div);
}

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  // User is signed in.
  var displayName = user.displayName;
  var email = user.email;
  var emailVerified = user.emailVerified;
  var photoURL = user.photoURL;
  var isAnonymous = user.isAnonymous;
  uid = user.uid;
  var providerData = user.providerData;
  console.log(email, displayName, photoURL, uid);
  document.getElementById('acname').innerText = displayName;
  document.getElementById('acname').title = email;
  document.getElementById('accountdata').style = 'display: block;';
  document.getElementById('cerror').style = 'display: block;';
  document.getElementById('iniciarsesss').style = 'display: none;';
  if (displayName === '') {
    document.getElementById('opaopa').style = 'display: block;';
  } else {
    document.getElementById('opaopa').style = 'display: none;';
  }
  if (uid === 'sJDYUXU9EbPr6KpeKvPPa4wugKk2') {
    document.getElementById('realcreate').style = 'display: block;';
  }
} else {
  // User is signed out.
  document.getElementById('cerror').style = 'display: none;';
  document.getElementById('accountdata').style = 'display: none;';
  document.getElementById('realcreate').style = 'display: none;';
  document.getElementById('iniciarsesss').style = 'display: block;';
  // ...
}
});
// Get Posts
function getPosts() {
  db.collection("posts").orderBy("createdAt")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(docs => {
        createPost(
          docs.data().postName,
          docs.data().createdAt,
          docs.data().postContent,
          docs.data().imgSource,
          docs.id,
          docs.data().likes
        );
      });
    })
    .catch(err => {
      console.log(err);
    });
}

getPosts();
