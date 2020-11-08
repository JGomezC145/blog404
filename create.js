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
          imgSource: imgSource
        });
    }
  } else if (pass === '' || ' ') {
    alert('Type the password.');
  } else {
    alert('Wrong password.');
  }
});
