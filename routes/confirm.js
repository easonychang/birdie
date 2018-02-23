var data = require("../events.json");
/*
 * GET confirm page.
 */

exports.confirmView = function(req, res){
	newEvent =	{

			"start" : req.query.time,
			"place" : req.query.place,
			"friend" : req.query.friend

		};

	data.events.push(newEvent);
	res.render('confirm');
}