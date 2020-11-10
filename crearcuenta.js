// Codigo 1450
//Made by JGomezC145


function crearr() {
  //variables
  var email = document.getElementById('emaill').value;
  var password =  document.getElementById('password12').value;
  var name = document.getElementById('naname').value;
  //si todo esta bien
  if (email === '' || password === '' || name === '') {
    alert('Complete fields');
  } else {
    //si no
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
  }
  firebase.auth().onAuthStateChanged(function(user) {
    user.updateProfile({
      displayName: name
  }).then(function() {
    // Update successful.
    alert('Done')
  }).catch(function(error) {
    console.log(error.message);
  })
  setTimeout ("redireccionar()", 3000);
})};

function redireccionar(){
  window.locationf="index.html";
}
