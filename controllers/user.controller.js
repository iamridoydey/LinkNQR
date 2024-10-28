const User = require("../models/user.model");
const { setUser } = require("../services/jwt.auth");

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

async function createNewUser(req, res) {
  const body = req.body;
  try {
    if (!body) return res.redirect("/signup");

    const { name, email, password } = body;

    if (!name || !email || !password) return res.redirect("/signup");
    if (!isValidEmail(email))
      return res.render("signup", { info: "Not A Valid Email!" });

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { info: "Email Already Exists!" });
    }

    // Create new user
    await User.create({
      name,
      email,
      password,
    });

    return res.redirect("/login");
  } catch (err) {
    return res.render("signup", { info: "Please Try Again" });
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the user exists with the given email and password
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.render("login", { info: "Not A Valid Email Or Password" });
    }

    // Generate a web token and set it to the cookie
    const token = setUser(user);
    res.cookie("uid", token);
    // If user is found, redirect to the homepage or dashboard
    return res.render("home", {isLogged: true});
  } catch (err) {
    // Handle any unexpected errors
    return res.render("login", {
      info: "Something Went Wrong!",
    });
  }
}

async function handleLogout(req, res) {
  console.log("Here in logout")
  try {
    // Clear the authentication cookie
    res.clearCookie("uid");

    // Redirect the user to the login page or homepage
    return res.render("home", { isLogged: false });
  } catch (err) {
    console.log("failed")
    // Handle any unexpected errors
    return res.render("login", {
      info: "Logout Failed! Please try again.",
    });
  }
}

module.exports = { createNewUser, handleLogin, handleLogout};
