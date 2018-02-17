
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')


// our routes
var home = require('./routes/home');
var recommended = require('./routes/recommended');
var login = require('./routes/login');
var friends = require('./routes/friends');
var confirm = require('./routes/confirm');
var sync = require('./routes/sync');
var scheduled = require('./routes/scheduled');
var recommended_viet = require('./routes/recommended_viet');
var recommended_chin = require('./routes/recommended_chin');
var recommended_kore = require('./routes/recommended_kore');
var recommended_mexi = require('./routes/recommended_mexi');
var calendar = require('./routes/calendar');

var temp = require('./routes/temp');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// added routes
app.get('/', login.loginView);
app.post('/login', login.loginPost);
app.get('/recommended', recommended.recommendedView);
app.get('/home', home.view);
app.get('/friends', friends.friendsView);
app.get('/confirm', confirm.confirmView);
app.get('/sync', sync.syncView);
app.get('/scheduled', scheduled.scheduledView);
app.get('/calendar', calendar.calendarView);

app.get('/temp',temp.tempView);

app.get('/recommended-viet', recommended_viet.recommendedView);
app.get('/recommended-mexi', recommended_mexi.recommendedView);
app.get('/recommended-chin', recommended_chin.recommendedView);
app.get('/recommended-kore', recommended_kore.recommendedView);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
