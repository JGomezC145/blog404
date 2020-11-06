// Firebase Config
var firebaseConfig = {
  apiKey: "AIzaSyDH2P75Fb2zZG8eiFMnXbaIX3ORWQOZ8eg",
  authDomain: "s4lblog1.firebaseapp.com",
  databaseURL: "https://s4lblog1.firebaseio.com",
  projectId: "s4lblog1",
  storageBucket: "s4lblog1.appspot.com",
  messagingSenderId: "1029776666754",
  appId: "1:1029776666754:web:340a2fea9be8e3ef01849b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let postCollection = document.querySelector("#posts-collection");

const db = firebase.firestore();

function createPost(title, time, content, imgsource) {
  let div = document.createElement("div");
  div.setAttribute("class", "col-md-4 card");

  let h2 = document.createElement("h2");
  let p = document.createElement("p");
  let small = document.createElement("small");
  let img = document.createElement("img");

  img.setAttribute("class", "card-img-top");
  h2.setAttribute("class", "card-title");
  p.setAttribute("class", "card-text");

  img.src = imgsource;
  h2.textContent = title;
  small.textContent = "Posted on: " + time;
  p.textContent = content;


  div.appendChild(img);
  div.appendChild(h2);
  div.appendChild(small);
  div.appendChild(p);


  postCollection.appendChild(div);
}

// Get Posts
function getPosts() {
  db.collection("posts")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(docs => {
        createPost(
          docs.data().postName,
          docs.data().createdAt,
          docs.data().postContent,
          docs.data().imgSource
        );
      });
    })
    .catch(err => {
      console.log(err);
    });
}

getPosts();
