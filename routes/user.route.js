const express = require("express");
const {createNewUser, handleLogin} = require("../controllers/user.controller");

const userRoute = express.Router();
// Handle SignUP
userRoute.post("/signup", createNewUser);
// Handle Login
userRoute.post("/login", handleLogin);

module.exports = userRoute;