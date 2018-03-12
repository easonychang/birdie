'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

    


})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    display();
    initConfirmForm();
}

function display(){
    //console.log(localStorage.restName);

    
    $('.eatwith').html("<h5> You want to eat at " + localStorage.restName + " with </h2>");
    
    
    if(localStorage.loggedIn === "loggedIn"){
        $('#icon').hide();  
        $('.userphoto').attr("src", localStorage.picurl);
    }else {
        $('.userphoto').hide();
    }
    
    console.log(localStorage.friendName);

    
    $('.mb-1').html("<h5>" + localStorage.friendName +"</h5>");
}


function initConfirmForm(){
    
    $("#confirmForm").submit(function(event){
        event.preventDefault();
        //console.log("submitting form ...");

        var confirmTime = $('#confirmTime').val();
        console.log(confirmTime);
        //alert("success");

        var monthDateYear = confirmTime.split(" -")[0];
        localStorage.monthDateYear = monthDateYear;
        console.log(monthDateYear);
        
        var time = confirmTime.split("- ")[1];
        localStorage.time = time;

        window.location = "/scheduled";
    });
}