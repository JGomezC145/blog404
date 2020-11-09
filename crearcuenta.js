// Codigo 1450
//Made for JGomezC145


function crearr() {
  var email = document.getElementById('emaill').value;
  var password =  document.getElementById('password12').value;
  var name = document.getElementById('naname').value;
  if (email === '' || password === '' || name === '') {
    alert('Complete fields');
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      (user)=>{
     // here you can use either the returned user object or       firebase.auth().currentUser. I will use the returned user object
        if(user){
          user.updateProfile({
             displayName: name
          })
        }
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  }





}
