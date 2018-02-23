'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	
	var user = "User";

    
    if(localStorage.loggedIn === "loggedIn"){
        user = localStorage.facebookname;
    } else if(localStorage.username !== undefined && localStorage.username !== null) {
        user = localStorage.username;
    } 
    

    console.log(localStorage.restName);

    
    $('.eatwith').html("<h5> You want to eat at " + localStorage.restName + " with ...</h2>");
    
    
    if(localStorage.loggedIn === "loggedIn"){
        
        $('#icon1').hide();  
        $('.userphoto1').attr("src", localStorage.picurl);
    } else {
        $('.userphoto1').hide();
    }


    
    $('.names').html("<h4>"+ user + " &amp; " + localStorage.friendName + "</h4>");

	$('.mb-1').html("<h5 class='mb-1'>You have a scheduled dinner at 7:00pm at " + localStorage.restName +".<br>Does this work?</h5>");
	
}