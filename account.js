function update() {
  var vame = document.getElementById('name').value;
  var ems;
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: vame,
  }).then(function() {
    // Update successful.
    alert('Done')
  }).catch(function(error) {
    // An error happened.
  });
}
function iniciar() {
  var email = document.getElementById('iniemail').value;
  var password = document.getElementById('inipass').value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    alert(errorMessage);
    // ...
  });
}
function cerrarsesi() {
  firebase.auth().signOut().then(function() {
  alert('Done');
}).catch(function(error) {
  alert(error.message);
});
}
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  // User is signed in.
  var displayName = user.displayName;
  var email = user.email;
  var emailVerified = user.emailVerified;
  var photoURL = user.photoURL;
  var isAnonymous = user.isAnonymous;
  var uid = user.uid;
  var providerData = user.providerData;
  console.log(email, displayName, photoURL, uid);
  document.getElementById('email').value = email;
  document.getElementById('name').value = displayName;

} else {
  // User is signed out.

  // ...
}
});
