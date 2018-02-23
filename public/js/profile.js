'use strict';

$(document).ready(function() {
	//console.log("hey");
	initializePage();
})

function initializePage() {
	var user = "User";
    if(localStorage.loggedIn === "loggedIn"){
        user = localStorage.facebookname;
        //console.log(localStorage.picurl);
        $('.userphoto').attr("src", localStorage.picurl);
    }
    else if(localStorage.username !== undefined && localStorage.username !== null) {
        user = localStorage.username;
    } 


   	

    $('#thisone').html("<h4>" + user + "</h4>");
}
