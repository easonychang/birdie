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
		console.log("pushing event");
	}
	res.send(data);
}