var events = require("../events.json");
/*
 * GET confirm page.
 */

exports.confirmView = function(req, res){
  res.render('confirm');
};