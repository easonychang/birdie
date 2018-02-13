/*
 *  * GET signup page.
 *   */

exports.loginView = function(req, res){
      res.render('login');
};

exports.loginPost = function(req,res){
	return res.redirect('/homepage');
};