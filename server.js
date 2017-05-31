// server.js

// set up ======================================================================
// get all the tools we need
var express  			= require('express');
var session 			= require('express-session');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var path 					= require('path');
var app           = express();
var port          = process.env.PORT || 8080;

var passport 			= require('passport');
var flash         = require('connect-flash');

// configuration ===============================================================
// connect to our database

require('./app/passport')(passport); // pass passport for configuration

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// required for passport
app.use(session({
	secret: 'klaatubaradanikto',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.use(express.static(path.join(__dirname, 'public')));

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
