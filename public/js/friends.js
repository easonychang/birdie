'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
    document.getElementById("solo-button").addEventListener("click", soloClick());

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
    } else {
        $('.userphoto').hide();
    }
    
    $(".list-group a").click(friendClick);
	
}

function soloClick(){

    var user = localStorage.username;

    //console.log(localStorage.facebookname)

    //console.log("before setting friend name: " +localStorage.friendName);

    if(localStorage.loggedIn === "loggedIn"){
        localStorage.friendName = localStorage.facebookname;
    }else if(user !== undefined && user !== null) {
        localStorage.friendName = localStorage.username
    }
    else {
        localStorage.friendName = "Yourself";
    }   
    console.log(localStorage.friendName);
    $.get('/scheduled');
}


function friendClick(e) {
    // prevent the page from reloading     
    e.preventDefault();

	var friendname = $(this).closest(".friend-name").context.querySelector(".friend-name").textContent;
    console.log(friendname);

    localStorage.friendName = friendname;


    window.location = $(this).attr("href");
}
