var data = require("../events.json");
/*
 * GET scheduled page.
 */

exports.scheduledView = function(req, res){
	res.render('scheduled');
};

exports.addEvent = function(req, res){
	//console.log("in here");


	var newEvent = {
		"eventName": req.body.rest, 
		"calendar": 'Food', 
		"color": 'orange', 
		"dates": req.body.md,
		"starttime" : req.body.time,
		"startday" : req.body.day,
		"place" : req.body.rest,
		"friend" : req.body.friend
	};


	//console.log(typeof newEvent);
	if(newEvent["eventName"]){
		data.events.push(newEvent);
		console.log(newEvent["eventName"]);
	}


	res.send(data);
}

exports.deleteEvent = function(req, res){
	//console.log("req is: ");

	//console.log(req.body);

	//var infoText = req.body.text;
	var searchStartTime = req.body.starttime;
	var searchStartDay = req.body.startday;
	var searchEventName = req.body.place;
	var searchFriend = req.body.friend;

	//console.log(searchStartTime);
	//console.log(searchStartDay);
	//console.log(searchEventName);
	//console.log(searchFriend);
	
	//deleting the object from our data.events array
	var index = data.events.length;
	
	  
	
	//console.log(data.events[0]);

	//console.log(data.events.eventName===searchEventName);

	while(index--){
		if(removeSpecial(data.events[index].eventName)===removeSpecial(searchEventName) &&
		   data.events[index].startday===searchStartDay &&
		   data.events[index].starttime===searchStartTime &&
		   data.events[index].friend=== searchFriend)
		{
			data.events.splice(index,1);
		}
		
	}
	
	//console.log(data.events);
	
	
	res.render('calendar2', data);
	

	
}

function removeSpecial(s){
	return s.replace(/[^a-z0-9]/g,'');
}