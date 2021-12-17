const db = require("../../data/dbConfig");

module.exports = {
  userDoesNotExistAlready,
  hashThePassword,
  reqBodyHasUsernameAndPassword,
  credentialsAreValid,
};

async function userDoesNotExistAlready(req, res, next) {
  const { username } = req.body;
  const error = { message: "username taken", status: 422 };
  const user = await db("users").where({ username: username })
  !user.length ? next() : res.json(error);
}

function hashThePassword(req, res, next) {
  console.log("hashThePassword");
  next();
}

function reqBodyHasUsernameAndPassword(req, res, next) {
  const { username, password } = req.body;
  const error = { message: "username and password required" };
  username && password ? next() : res.json(error);
}
// 4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
//       the response body should include a string exactly as follows: "invalid credentials".
function credentialsAreValid(req, res, next) {
  console.log("credentialsAreValid");
  next();
}
