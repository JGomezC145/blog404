var finalfile = '';
function progresar(i) {
  document.getElementById('progresante').value = i;
  document.getElementById('progresante').innerText = i + "%";
}
function getfile() {
  var file = document.querySelector('#requestpic').files[0];
  finalfile = file;
  // console.log(finalfile);
}
function tete() {
  // console.log(finalfile.name);
  var uploadTask = storageRef.child('images/' + finalfile.name).put(finalfile);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    progresar(progress);
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      alert('User does not have permission to access the object');
      break;

    case 'storage/canceled':
      // User canceled the upload
      alert('User canceled the upload');
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      alert('Error: ')
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    document.getElementById('imgSource').value = downloadURL;
  });
});
}

document.querySelector("#submitBtn").addEventListener("click", function() {
  var pass = document.getElementById('postpass').value;
  let postAuthor = document.querySelector("#author").value;
  let postTitle = document.querySelector("#postTitle").value;
  let postContent = document.querySelector("#postContent").value;
  let postDate = document.querySelector("#postDate").value;
  let imgSource = document.querySelector("#imgSource").value;

  if (pass === 'rocket') {
    if (
      postAuthor === "" ||
      postTitle === "" ||
      postContent === "" ||
      postDate === ""
    ) {
      alert("Fields Empty");
    } else {
      db.collection("posts")
        .doc()
        .set({
          author: postAuthor,
          createdAt: postDate,
          postName: postTitle,
          postContent: postContent,
          imgSource: imgSource,
          likes: 0
        });
      alert('Posted');
      var setas = setTimeout(clearall(), 3000);
    }
  } else if (pass === '' || ' ') {
    alert('Type the password.');
  } else {
    alert('Wrong password.');
  }
});

function clearall() {
  document.getElementById("author").value = '';
  document.getElementById("postTitle").value = '';
  document.getElementById("postContent").value = '';
  document.getElementById("postDate").value = '';
  document.getElementById("imgSource").value = '';
  document.getElementById("postpass").value = '';
}
let previewzone = document.getElementById("prestados");
function previer() {
  previewzone.innerHTML = '';


  var title = document.getElementById("postTitle").value;
  var time = document.getElementById("postDate").value;
  var content = document.getElementById("postContent").value;
  var imgsource = document.getElementById("imgSource").value;
  var likes = 0;


  let div = document.createElement("div");
  div.setAttribute("class", "col-md-4");
  let yikes = document.createElement("div");
  let card = document.createElement("div");
  let cardbody = document.createElement("div");
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


  previewzone.appendChild(div);
}
