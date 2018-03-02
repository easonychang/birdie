function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  console.log('Facebook login status changed.');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
        console.log('Successfully logged in with Facebook');
        var accessToken = response.authResponse.user_friends;


        //impossible to tests
        FB.api('/me/friends', 'GET',{}, displayFriend);


        FB.api('/me?fields=name,first_name,picture.type(square)', changeUser);
        
  }
}

function changeUser(response){
  if(typeof(Storage) !== "undefined") {
		localStorage.facebookname = response.first_name;
    localStorage.picurl = response.picture.data.url;
    localStorage.loggedIn = "loggedIn";
   
    
	}else{
		console.log("Your browser does not support web storage.");
  }



  
  
  window.location.replace("/home");

}


function displayFriend(response){
  console.log(response);
}