/**
 * jTinder initialization
 */
var like_count = 0;
var dislike_count = 0;
var total_count = 0;
var total_item = document.getElementById("myul").getElementsByTagName("li").length;

//console.log(document.getElementById("myul").getElementsByTagName("li").length);

$("#tinderslide").jTinder({
	// dislike callback
	
	
	
    onDislike: function (item) {
	    // set the status text
		//$('#status').html('Dislike image ' + (item.index()+1));
		dislike_count += 1;
		total_count += 1;

		console.log(dislike_count);

		if(dislike_count == 5){
        	alert("There are no more restaurants in your area.\n Try changing the settings in your profile or picking a new cuisine!");
        }
       
		
		if(item.index()==0){
				window.location.replace("/home");
		}
    },
	// like callback
    onLike: function (item) {
	    // set the status text
		//$('#status').html('Like image ' + (item.index()+1));
		like_count += 1;
		total_count += 1;

		

		
		//this gets us the name of the restraunt that we swipe right
		console.log(item.prevObject[total_item-total_count].querySelector(".card-title").textContent);
		localStorage.restName = item.prevObject[total_item-total_count].querySelector(".card-title").textContent;
		console.log(localStorage.restName);
		

		/*//randomize A/B testing
		var rand = Math.floor(Math.random()*2);
		console.log(rand);
		if(rand === 0){
			//original
			window.location.replace("/friends_A");
		}else{
			//new design
			window.location.replace("/friends_B");
		}*/
			
		window.location.replace("/friends_B");
			
		
		
		/*if(item.index()==0){
			if(like_count > 1){
				//locally store the liked pages
				//load ranking page and ask users to rank them, then redirect to friend
				
			}
			window.location.replace("/friends");
		}*/
    },
	animationRevertSpeed: 200,
	animationSpeed: 400,
	threshold: 1,
	likeSelector: '.like',
	dislikeSelector: '.dislike'
});

/**
 * Set button action to trigger jTinder like & dislike.
 */
$('.actions .like, .actions .dislike').click(function(e){
	e.preventDefault();
	$("#tinderslide").jTinder($(this).attr('class'));
});