const { getUser } = require("../services/jwt.auth");

// Authentication for the URL routes
async function validUser(req, res, next) {
  try {
    const token = req.cookies.uid;

    // Check if there is a valid token or not
    if (!token) {
      console.warn("No token found in cookies.");
      return res.redirect("/login");
    }

    // Get the user by token
    const user = getUser(token);

    // Check whether the user is valid or not
    if (!user) {
      console.warn("Invalid user for the provided token.");
      return res.redirect("/login");
    }

    // Attach the user to the request object for later use
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in validUser middleware: ", error.message);
    return res.redirect("/login");
  }
}

async function checkAuth(req, res, next) {
  try {
    const token = req.cookies.uid;
    const user = getUser(token);

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in checkAuth middleware: ", error.message);
    // Allow unauthenticated access without redirecting
    req.user = null;
    next();
  }
}

module.exports = { validUser, checkAuth };
