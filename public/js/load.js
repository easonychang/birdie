'use strict';

// Call this function when the page loads (the "onload" event)
$(document).ready(function() {
    initializePage();
	

})

function initializePage(){
    window.onload = goToNextPage;
    
}

function goToNextPage(){

    var pathArray = window.location.pathname.split('/');

    var nextPage = pathArray[pathArray.length-1];
    

    window.location = '/getrecommended/'+ nextPage;
}