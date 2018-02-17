'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();



})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	
	$('#name').html("<h2> Hello, " + localStorage.name + "</h2>");
    

    //console.log(localStorage.loggedIn);

    if(localStorage.loggedIn !== true){
        $('#icon').hide();    
        $('.userphoto').attr("src", localStorage.picurl);
    

    }
	
	
}