const express = require("express");
const { createUser, handleLogin, getUserList, getAccount } = require("../controllers/userController");
const delay = require("../middleware/delay");
const auth = require("../middleware/auth");
const routerAPI = express.Router();

routerAPI.all("*", auth);

routerAPI.get("/", (req, res) => {
  res.status(200).json("Hello World");
});

routerAPI.post("/register", createUser)
routerAPI.post("/login", handleLogin)
routerAPI.get("/user", getUserList)
routerAPI.get("/account", getAccount)

module.exports = routerAPI;