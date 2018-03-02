var events = require("../events.json");
/*
 * GET scheduled page.
 */

exports.scheduledView = function(req, res){
	res.render('scheduled');
};

exports.addEvent = function(req, res){
	console.log("in here");
	var newEvent = {
		"eventName": req.body.rest, 
		"calendar": 'Food', 
		"color": 'orange', 
		"dates": '3/6',
		"start" : "7:00 PM Tuesday",
		"place" : req.body.rest,
		"friend" : req.body.friend
	};
	events.events.push(newEvent);
	res.send(events);
}