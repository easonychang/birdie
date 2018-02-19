/**
 * jTinder initialization
 */
$("#tinderslide").jTinder({
	// dislike callback
    onDislike: function (item) {
	    // set the status text
		//$('#status').html('Dislike image ' + (item.index()+1));
		if(item.index()==0){
			window.location.replace("http://localhost:3000/friends");
		}
    },
	// like callback
    onLike: function (item) {
	    // set the status text
		//$('#status').html('Like image ' + (item.index()+1));
		if(item.index()==0){
			window.location.replace("http://localhost:3000/friends");
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