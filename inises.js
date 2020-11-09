//hola wapo, que haces aqui?
function iniciar() {
  var email = document.getElementById('singinemail').value;
  var password = document.getElementById('singinpassword').value;

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
