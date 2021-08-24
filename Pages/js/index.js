var firebaseConfig = {
    apiKey: "AIzaSyDDjexnK6KwLm-GppAeJIyitBhCUS1BuG8",
    authDomain: "q-blog-f.firebaseapp.com",
    projectId: "q-blog-f",
    storageBucket: "q-blog-f.appspot.com",
    messagingSenderId: "526947503667",
    appId: "1:526947503667:web:e95d6b5bdbe0256dfc5d46"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL;

$("#btn-login").click(function (){
    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != ""){

        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            console.error(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        });

    }
    else {
        windows.alert("Please fill out all fields.");
    }
});

$("#btn-logout").click(function (){
  firebase.auth().signOut();
});


$("#btn-resetPassword").click(function (){
    var auth = firebase.auth();
    var email = $("#email").val();

    if (email != ""){
        auth.sendPasswordResetEmail(email).then(function()
        {
            window.alert("Email has been sent to you, please check and follow the steps.");
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            console.error(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        });    
    }
    else{
        window.alert("Please enter your Email first.");
    }
  });

$("#btn-signup").click(function (){
    var email = $("#email").val();
    var password = $("#password").val();
    var cpassword = $("#confirmpassword").val();


    if (email != "" && password != "" && cpassword != ""){

        if(password == cpassword){
            var result = firebase.auth().createUserWithEmailAndPassword(email, password);
        result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            console.error(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        });
        }
        else{
            window.alert("Passwords do not match.");
        }

    }
    else {
        windows.alert("Please fill out all fields.");
    }
});

$("#btn-update").click(function (){
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var country = $("#country").val();
    var gender = $("#gender").val();
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);
    if (firstname != "" && lastname != "" && country != "" && gender != "" && phone != "" && address != "" && bio != ""){
        var userData = 
        {
            "FirstName": firstname,
            "LastName": lastname,
            "gender": gender,
            "phone": phone,
            "address": address,
            "country": country,
            "bio": bio,  
        };

        usersRef.set(userData, function(error)
        {
            if(error){
                var errorCode = error.code;
                var errorMessage = error.message;

                console.error(errorCode);
                console.log(errorMessage);
                window.alert("Message : " + errorMessage);
            }
            else{
                window.location.href = "/Index.html";
            }
        })
    }
    else{
        window.alert("Form is incomplete. PLease fill out all the fields.");
    }
  });


  function switchView(view){
      $.get({
          url:view,
          cache:false,
      }).then(function(data){
        $("#container").html(data);
      });
  }