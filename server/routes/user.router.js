const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
// app.use('/api', router)

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/authentication/:username', (req, res) => {
  // GET route code here
  const {username} = req.params
console.log('req:', req)
  console.log(`in /api/user/authentcation GET route. authenticating ${username}`);
  // console.log('Is User logged in?', req.isAuthenticated());
  // console.log('req.user:', req.user);
// const id = req.params.id
  let queryText = `SELECT "code FROM "user"
                    WHERE "username" = $1;`;
  
  pool.query(queryText, [username]).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });


});


// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('in /register POST')
  console.log('req.body:', req.body)

  const password = encryptLib.encryptPassword(req.body.password),
  // const password = req.body.password,
   {username, phone, code} = req.body,
  queryText = `INSERT INTO "user" (username, password, phone, code)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [username, password, phone, code])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});




module.exports = router;
