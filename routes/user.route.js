const express = require("express");
const {createNewUser, handleLogin, handleLogout} = require("../controllers/user.controller");

const userRoute = express.Router();
// Handle SignUP
userRoute.post("/signup", createNewUser);
// Handle Login
userRoute.post("/login", handleLogin);
// Handle Logout
userRoute.post("/session/logout", handleLogout)

module.exports = userRoute;