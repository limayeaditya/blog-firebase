
  var firebaseConfig = {
    apiKey: "AIzaSyBdsaXwQuCqbYv6_pni8lEaPa7OsOSiepA",
    authDomain: "blog-65b34.firebaseapp.com",
    projectId: "blog-65b34",
    storageBucket: "blog-65b34.appspot.com",
    messagingSenderId: "229930262946",
    appId: "1:229930262946:web:cf9a06c2abbc41f3a952fb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

 
    function signUp(){

        var name= document.getElementById("name");
        var email = document.getElementById("email");
        var password = document.getElementById("password");
        console.log(name.value);
        firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((res) => {
        const user = firebase.auth().currentUser;

        
        if (user != null) {
            user.updateProfile({
                displayName: name.value
            }).then(() => {
              
                window.location = 'blog.html';
            }).catch((error) => {
              console.log(error);
            });
        } else {
          alert("Error");
        }
    
      }
      ).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        
      });
        
}

function signIn(){
    
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((res) => {
       
        window.location = 'blog.html';
       
      }
      ).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        
      });
    }

  function googleSignIn(){
    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function(result){
      console.log(result);
      window.location = 'blog.html';
    }).catch(function(err){
      console.log(err);

    });
  }