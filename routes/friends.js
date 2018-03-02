
/*
 * GET both friends pages.
 */

exports.friendsAView = function(req, res){
  res.render('friends_A');
};

exports.friendsBView = function(req, res){
  res.render('friends_B');
};