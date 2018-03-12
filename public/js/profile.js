'use strict';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	var user = "User";
    

    //loading preferences 
    if(localStorage.favorite !== undefined){
        document.getElementById("favorite").value = localStorage.favorite;
    }
    if(localStorage.disliked !== undefined){
        document.getElementById("disliked").value = localStorage.disliked;
    }
    if(localStorage.allergies !== undefined){
        document.getElementById("allergies").value = localStorage.allergies;
    }
    if(localStorage.driving !== undefined){
        document.getElementById("driving").value = localStorage.driving;
    }
    if(localStorage.budget !== undefined){
        document.getElementById("budget").value = localStorage.budget; 
    }


    if(localStorage.loggedIn === "loggedIn"){
        user = localStorage.facebookname;
        //console.log(localStorage.picurl);
        $('.userphoto').attr("src", localStorage.picurl);
        $('#icon').hide();
    }
    else if(localStorage.username !== undefined && localStorage.username !== null) {
        $('.userphoto').hide();
        user = localStorage.username;
    } else {
        $('.userphoto').hide();
    }

    $('#thisone').html("<h4>" + user + "</h4>");
}