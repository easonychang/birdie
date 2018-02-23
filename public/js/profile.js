'use strict';

$(document).ready(function() {
	console.log("hey");
	initializePage();
})

function initializePage() {
	var user = "User";
	if(localStorage.username !== undefined && localStorage.username !== null) {
        user = localStorage.username;
    } 
    else if(localStorage.loggedIn === "loggedIn"){
        user = localStorage.facebookname;
    }

   	if(localStorage.loggedIn === "loggedIn"){
        $('#changepic').attr("src", localStorage.picurl);
    }

    $('#thisone').html("<h4>" + user + "</h4>");
}
