'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();



})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

    console.log(localStorage.username);
    var user = localStorage.username;

    if(localStorage.loggedIn === "loggedIn"){
        $('#name').html("<h2> Hello, " + localStorage.email + "</h2>");
        $('#icon').hide();    
        $('.userphoto').attr("src", localStorage.picurl);
    }else if(user !== undefined && user !== null) {
        $('#name').html("<h2> Hello, " + localStorage.username + "</h2>");
    }
    else {
         $('#name').html("<h2> Hello, User </h2>");
    }	
	
}