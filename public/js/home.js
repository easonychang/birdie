'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();



})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	
	
    

    console.log(localStorage.loggedIn);

    if(localStorage.loggedIn === "loggedIn"){
        $('#name').html("<h2> Hello, " + localStorage.facebookname + "</h2>");
        $('#icon').hide();    
        $('.userphoto').attr("src", localStorage.picurl);
    

    }else{
        //$('#name').html("<h2> Hello, " + localStorage.userentername + "</h2>");
    }
	
	
}