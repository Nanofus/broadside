// app/routes.js

var express = require('express');
var path = require('path');

var mysql = require('mysql');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = (app, passport) => {

	// =====================================
	// API =================================
	// =====================================

	var router = express.Router();
	router.get('/', isLoggedIn, (req, res) => {
		res.json({ message: 'hooray! welcome to our api!' });
	});

	router.post('/login', passport.authenticate('local-login'), (req, res) => {
		if (req.body.remember) {
			req.session.cookie.maxAge = 1000 * 60 * 3;
		} else {
			req.session.cookie.expires = false;
		}
		res.json(req.user);
	});

	router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
		if (req.body.remember) {
			req.session.cookie.maxAge = 1000 * 60 * 3;
		} else {
			req.session.cookie.expires = false;
		}
		res.json(req.user);
	});

	router.get('/logout', (req, res) => {
		req.logout();
		res.json({ result: true });
	});

	router.get('/user-data', (req, res) => {
		res.json(req.user);
	});

	router.get('/posts/list', (req, res) => {
		connection.query("SELECT Id, Header FROM Post", (err, rows) => {
			if (!err)
				res.json(rows);
			else
				res.json({ message: false });
		});
	});

	router.get('/posts/:id', (req, res) => {
		connection.query(`
			SELECT Header, Text, CreatedTimestamp, ModifiedTimestamp, CategoryId
			FROM Post
			WHERE Id = ?
			`,[req.params.id], (err, rows) => {
				if (!err) {
					let postData = rows[0];
					connection.query(`
						SELECT u.Username
						FROM User u
						JOIN PostUser pu ON pu.UserId = u.Id
						WHERE pu.PostId = ?
						`,[req.params.id], (err, innerRows) => {
							postData.Users = [];
							for (let row of innerRows) {
								postData.Users.push(row.Username);
							}
							delete postData.Username;
							res.json(postData);
						});
				} else {
					res.json({ result: false });
				}
			});
	});

	router.post('/write/:id',
		passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' },
			(req, res) => {
				if (req.params.id == "new") {
					connection.query(`
						INSERT INTO Post
						VALUES ()
						`, (err, rows) => {
							if (!err)
								res.json(rows);
							else
								res.json({ message: false });
						});
				} else {

				}
			});

		app.use('/api', router);

	};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.json({ result: false });
}
