
/*
 * GET both friends pages.
 */

exports.friendsAView = function(req, res){
  var det = {
    "viewAlt": false
  };
  res.render('friends_A', det);
};

exports.friendsBView = function(req, res){
  var det = {
    "viewAlt": true
  };
  res.render('friends_A', det);
};