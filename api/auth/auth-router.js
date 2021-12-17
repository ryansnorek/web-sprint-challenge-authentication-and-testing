const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { BCRYPT_ROUNDS } = require('../../config');
const Users = require("../models/users-model");
const {
  userDoesNotExistAlready,
  reqBodyHasUsernameAndPassword,
  userDoesExist,
  tokenBuilder
} = require("./auth-middleware");

router.post(
  "/register",
  reqBodyHasUsernameAndPassword,
  userDoesNotExistAlready,
  (req, res, next) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);
    Users.add({ username, password: hash })
      .then((user) => res.json(user))
      .catch(next);
  }
);

router.post(
  "/login",
  reqBodyHasUsernameAndPassword,
  userDoesExist,
  (req, res, next) => {
    const { password } = req.body;
    const passwordMatch = bcrypt.compareSync(password, req.user.password)
    if (passwordMatch) {
      const token = tokenBuilder(req.user);
      res.json({
        message: `welcome, ${req.user.username}`,
        token
      })
    } else {
      next({ message: "invalid credentials" })
    }
    /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
  }
);

module.exports = router;
