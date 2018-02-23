var events = require("../events.json");
/*
 * GET calendar2 page.
 */

exports.calendarrView = function(req, res){
  res.render('calendar2', events);
}; 
