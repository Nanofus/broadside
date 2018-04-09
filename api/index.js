const express = require('express');

// Create express router
const router = express.Router();

const path = require('path');
const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config.db.connection);
connection.query('USE ' + config.db.database);

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
var app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// API root

router.get('/', isLoggedIn, (req, res) => {
  res.json({ message: 'hooray! welcome to our api!', user: req.session.authUser });
});

// Add POST - /api/login
router.post('/login', (req, res) => {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ message: 'Bad credentials' })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ result: true })
})

router.post('/signup', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/user-data', (req, res) => {
  res.json(req.session.authUser);
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

// route middleware to make sure
function isLoggedIn(req, res, next) {
  if (req.session.authUser != null)
    return next();
  res.json({ result: false });
}

// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
