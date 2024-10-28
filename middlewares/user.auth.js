const {getUser} = require("../services/jwt.auth")


// Authentication for the url routes
async function validUser(req, res, next){
  const token = req.cookies.uid;

  // Check is there a valid token or not
  if (!token) return res.redirect("/login")

  // Get the user by token
  const user = getUser(token);

  // Check whether user is valid or not
  if (!user) return res.redirect("/login");

  res.user = user;
  next()
}

module.exports = {validUser}