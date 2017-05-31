// app/routes.js

var express = require('express');
var path = require('path');

var mysql = require('mysql');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {

	// =====================================
	// API =================================
	// =====================================

	var router = express.Router();
	router.get('/', isLoggedIn, function(req, res) {
	  res.json({ message: 'hooray! welcome to our api!' });
	});
	router.post('/login', passport.authenticate('local-login'), function(req, res) {
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    res.json(req.user);
  });
	router.post('/signup', passport.authenticate('local-signup'), function(req, res) {
		res.json(req.user);
	});
	router.get('/logout', function(req, res) {
		res.json({ message: "success" });
	});
	router.get('/user-data', function(req, res) {
		res.json(req.user);
	});

	router.get('/posts/list', function(req, res) {
		connection.query("SELECT Id, Header FROM Post", function(err, rows){
	    if (!err)
				res.json(rows);
	    else
				res.json({ message: 'Error in API' });
		});
	});

	router.get('/posts/:id', function(req, res) {
		connection.query("SELECT Header, Text FROM Post WHERE Id = ?",[req.params.id], function(err, rows){
			if (!err)
				res.json(rows);
			else
				res.json({ message: 'Error in API' });
		});
	});

	app.use('/api', router);

};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.json({ message: "You are not logged in." });
}
