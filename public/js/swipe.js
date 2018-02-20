/**
 * jTinder initialization
 */
var like_count = 0;
var dislike_count = 0;

$("#tinderslide").jTinder({
	// dislike callback
	
	
    onDislike: function (item) {
	    // set the status text
		//$('#status').html('Dislike image ' + (item.index()+1));
		dislike_count += 1;

		console.log(dislike_count);
		
		if(item.index()==0){
			if(dislike_count === 5){ //currently hardcoded because we only render 5 restaurants
				//every recommendation was disliked
				window.location.replace("/home");
			}else{
				window.location.replace("/friends");
			}
			
		}
    },
	// like callback
    onLike: function (item) {
	    // set the status text
		//$('#status').html('Like image ' + (item.index()+1));
		like_count += 1;
		
		
		
		if(item.index()==0){
			if(like_count > 1){
				//locally store the liked pages
				//load ranking page and ask users to rank them, then redirect to friend
				
			}
			window.location.replace("/friends");
		}
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