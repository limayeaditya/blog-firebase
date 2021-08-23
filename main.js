initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var currentUser = firebase.auth().currentUser;
        console.log(currentUser);
        console.log(currentUser.uid);

      } else {
    window.location = 'index.html';
    // alert("Login first");
      }
    }, function(error) {
      console.log(error);
    });
    
  };

   function myData(){
    var user = firebase.auth().currentUser;
    if (user) {
        // User is signed in.
        if (user != null) {
         var uid = user.uid;  
        }
      }

      firebase.database().ref('blogs/').orderByChild('userid').equalTo(uid).on("value",function(snapshot){
        var posts_div = document.getElementById('posts');

        posts.innerHTML=""

        var myData = snapshot.val();
        console.log(myData);

        for(let[key,value] of Object.entries(myData)){
            posts_div.innerHTML = "<div class='col-sm-4 mt-2 mb-1'>"+
            "<div class = 'card'>" +
            "<img src= '"+value.imageURL+"' style='display: block;margin-left: auto;margin-right: auto;height:250px;width:100%'>" +
            "<div class='card-body'><p class='card-text'>" + value.text + "</p>" +
            "<button class='btn btn-danger' id= '"+key+"' style='background-color: #D5F5E3;color: black;font-weight:2px;border: 2px solid black;' onclick = 'deletePost(this.id)'>Delete</button>"+
            "</div></div></div></div>" + posts_div.innerHTML;
        }
   
    });
   
}

function upload(){

    var user = firebase.auth().currentUser;
    if (user) {
    // User is signed in.
    if (user != null) {
      var currentName = user.displayName;
      var email = user.email;
     
      var uid = user.uid;  
      console.log(currentName);
        console.log(email);
        console.log(uid);
       }
  }

    var image = document.getElementById('image').files[0];

    var post = document.getElementById('post').value;

    var imageName = image.name;

    var storageRef = firebase.storage().ref('images/' + imageName);
    
    var uploadTask = storageRef.put(image);

    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("Upload is" + progress + "done");
            }, function(error){
                    console.log(error.message);
            }, function(){
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                firebase.database().ref('blogs/').push().set({
                        userid: uid,
                        author: currentName,
                        text: post,
                        imageURL: downloadURL
            }, function(error){
                        if(error){
                            alert("Error while uploading");
                        }
                        else{
                            alert("Successfully uploaded");
                            document.getElementById('post-form').reset();
                            getData();
                        }
            });

        });
    });
}

window.addEventListener('load', function() {
    initApp();
  });

window.onload = function(){
    this.getData();
}

function getData(){
    firebase.database().ref('blogs/').once('value').then(function(snapshot){
        var posts_div = document.getElementById('posts');

        posts.innerHTML=""

        var data = snapshot.val();
        console.log(data);

        for(let[key,value] of Object.entries(data)){
            posts_div.innerHTML = "<div class='col-sm-4 mt-2 mb-1'>"+
            "<div class = 'card'>" +
            "<img src= '"+value.imageURL+"' style='display: block;margin-left: auto;margin-right: auto;height:250px;width:100%'>" +
            "<div class='card-body'><p class='card-text' style='font-size:20px'> " + value.author + "</p>"+
            "<div class='card-body'><p class='card-text'>" + value.text + "</p>" +
            "</div></div></div></div>" + posts_div.innerHTML;
        }
   
    });
}

function deletePost(key){
    firebase.database().ref('blogs/' + key).remove();
    getData();
}

function logout(){
    firebase.auth().signOut();
    window.location='index.html';
  }

