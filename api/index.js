const express = require('express');

// Create express router
const router = express.Router();
const path = require('path');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');

const { Client } = require('pg');
const connection = new Client({
  user: config.db.connection.user,
  host: config.db.connection.host,
  database: config.db.database,
  password: config.db.connection.password,
  port: config.db.connection.port,
})
await connection.connect()

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
  res.json({ message: 'This is the Broadside API!', user: req.session.authUser });
});

// Add POST - /api/login
router.post('/login', (req, res) => {
  connection.query("SELECT * FROM User WHERE Username = ?",[req.body.username], (err, rows) => {
    if (err) {
      res.status(401).json({ message: err });
      return;
    }

    if (!rows.length) {
      res.status(401).json({ message: 'No user found' });
      return;
    }

    // if the user is found but the password is wrong
    let user = rows[0];
    if (!bcrypt.compareSync(req.body.password, user.Password)) {
      res.status(401).json({ message: 'Bad credentials' });
      return;
    }

    // all is well, return successful user
    return res.json({ username: user.Username, role: user.Role });
  });
});

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ result: true })
})

router.post('/signup', (req, res) => {
  connection.query("SELECT * FROM User WHERE Username = ?",[username], (err, rows) => {
    if (err) {
      res.status(401).json({ message: err });
      return;
    }

    if (rows.length) {
      res.status(401).json({ message: 'Username already taken' });
      return;
    }

    // if there is no user with that username
    // create the user
    let newUserMysql = {
      Username: req.body.username,
      Password: bcrypt.hashSync(req.body.password, null, null),
      Role: 3
    };

    var insertQuery = "INSERT INTO User ( Username, Password, Role ) values (?,?,?)";
    connection.query(insertQuery,[newUserMysql.Username, newUserMysql.Password, newUserMysql.Role], (err, rows) => {
      newUserMysql.Id = rows.insertId;
      return res.json({ username: newUserMysql.Username, role: newUserMysql.Role });
    });
  });
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
