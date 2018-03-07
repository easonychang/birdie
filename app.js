
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
//var friends_B = require('./routes/friends');
var confirm = require('./routes/confirm');
var load = require('./routes/load');
var scheduled = require('./routes/scheduled');
var calendar = require('./routes/calendar');
var calendar2 = require('./routes/calendar2');
var profile = require('./routes/profile');
var info = require('./routes/info');

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

app.get('/friends_A', friends.friendsAView);
app.get('/friends_B', friends.friendsBView);

app.get('/confirm', confirm.confirmView);
app.get('/load', load.loadView);
app.get('/scheduled', scheduled.scheduledView);
app.all('/scheduledEvent', scheduled.addEvent);
app.all('/unScheduleEvent', scheduled.deleteEvent);
//app.post('/scheduledEvent', scheduled.addEvent);
app.get('/calendar', calendar.calendarView);

app.get('/temp',temp.tempView);

app.get('/recommended/:cuisine', recommended.recommendedView);
app.get('/getRecommended/:cuisine', recommended.getRec);
app.get('/profile', profile.profileView);

app.get('/calendar2', calendar2.calendarrView);
app.get('/info', info.infoView);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
