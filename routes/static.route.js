const express = require("express");

const staticRoute = express.Router();
// GET request for home page
staticRoute.get("/", async (req, res)=>{
  const hasUser = req.user !== null? true: false;
  return res.render("home", {isLogged: hasUser});
})


// GET request for signup page
staticRoute.get("/signup", async (req, res) => {
  return res.render("signup");
});

// GET request for login page
staticRoute.get("/login", async (req, res) => {
  return res.render("login");
});


module.exports = staticRoute;
