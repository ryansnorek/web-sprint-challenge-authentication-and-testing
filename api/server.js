const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const restrict = require("./middleware/restricted.js");

const authRouter = require("./auth/auth-router.js");
const jokesRouter = require("./jokes/jokes-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.static(path.join(__dirname, "../client")));
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", restrict, jokesRouter);

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
