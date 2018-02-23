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

    
    $('.restaurant').html("<h2> You want " + localStorage.restName + "</h2>");
    
    if(localStorage.loggedIn === "loggedIn"){
        $('#icon').hide();  
        $('.userphoto').attr("src", localStorage.picurl);
    }
    
    $("a").click(friendClick);
	
}


function friendClick(e) {
    // prevent the page from reloading     
    e.preventDefault();
    // In an event handler, $(this) refers to     
    // the object that triggered the event    
    
    
	
	var friendname = $(this).closest(".mb-1").context.querySelector(".mb-1").textContent;
    console.log(friendname);

    localStorage.friendName = friendname;


    window.location = $(this).attr("href");
}
