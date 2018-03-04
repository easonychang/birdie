'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
    document.getElementById("confirmButton").addEventListener("click", sendEvent);
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	display();
	
}

function display(){
    //console.log("initializing page and the friend name is: " + localStorage.friendName );

	var user = "User";

    
    if(localStorage.loggedIn === "loggedIn"){
        user = localStorage.facebookname;
    } else if(localStorage.username !== undefined && localStorage.username !== null) {
        user = localStorage.username;
    } 
    

    //console.log(localStorage.restName);

    
    $('.eatwith').html("<h5> You want to eat at " + localStorage.restName + " with ...</h2>");
    
    
    if(localStorage.loggedIn === "loggedIn"){
        
        $('#icon1').hide();  
        $('.userphoto1').attr("src", localStorage.picurl);
    } else {
        $('.userphoto1').hide();
    }

    //console.log(localStorage.friendName);
    
    $('.names').html("<h4>"+ user + " &amp; " + localStorage.friendName + "</h4>");

    displayTime();
    
}


function displayTime(){
    //check if lunch or dinner
    var time = localStorage.time;
    //console.log(time);
    var amPm = time.split(" ")[1];
    //console.log(amPm);


    var timeInt = parseInt(time.split(":")[0]);
    //console.log(timeInt);
    
    var hour;
    if(amPm === "AM"){
        hour = timeInt;
    }else if( amPm === "PM"){
        hour = timeInt + 12;
    }

    console.log(hour);


    var mealType;
    //meal time
    if(hour >= 6 && hour <= 9){
        mealType = "breakfast";
    }else if(hour >= 10 && hour <= 15){
        mealType = "lunch";
    }else if(hour >= 15 && hour <= 22){
        mealType = "dinner";   
    }else{
        mealType = "snack";
    }


    //display MM DD
    var monthDateYear = localStorage.monthDateYear;
    var newDate = new Date(monthDateYear);
    var newDateStr = newDate.toDateString();
    var displayDate = newDateStr.split(" ")[1]+ " " +newDateStr.split(" ")[2];
    //console.log(displayDate);

    $('.mb-1').html("<h5 class='mb-1'>You have a scheduled " + mealType + "</h5> <h5> at " + time + " on " + displayDate + "</h5> <h5> at "  + localStorage.restName +".</h5> <h5> Does this work?</h5>");
}




function sendEvent(){
    var restaurant = localStorage.restName;
    var friend = localStorage.friendName;
    //console.log(restaurant);
    //console.log(friend);
    var monthDateYear = localStorage.monthDateYear;
    var monthDate = monthDateYear.split("/")[0]+ "/"+monthDateYear.split("/")[1];

    //console.log(monthDate);

    var newDate = new Date(monthDateYear);
    var newDateStr = newDate.toDateString();
    var dayofWeek = newDateStr.split(" ")[0];
    //console.log(dayofWeek);

    var time = localStorage.time;
    

    $.post('/scheduledEvent', {rest: restaurant, friend: friend, md: monthDate, time: time, day: dayofWeek});

    /*function callBack(){
        alert("rest is:" + restaurant + "friend is:" + friend);
    }*/
}
