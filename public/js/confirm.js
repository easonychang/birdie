'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();



})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

    console.log(localStorage.restName);

    
    $('.eatwith').html("<h5> You want to eat at " + localStorage.restName + " with </h2>");
    
    
    if(localStorage.loggedIn === "loggedIn"){
        $('#icon').hide();  
        $('.userphoto').attr("src", localStorage.picurl);
    }else {
        $('.userphoto').hide();
    }
    
	$('.friend-name').html("<h5>" + localStorage.friendName +"</h5>");
	
}
