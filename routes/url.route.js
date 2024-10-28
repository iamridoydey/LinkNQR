const express = require("express");
const {
  handleOnPost,
  redirectToOriginalUrl,
  getAnalytics
} = require("../controllers/url.controllers");

const urlRoute = express.Router();
// Create New URL
urlRoute.post("/", handleOnPost)

// Update Url When it being clicked 
urlRoute.get("/:shortId", redirectToOriginalUrl);

// GET request for analytics page
urlRoute.get("/analytics", getAnalytics);


module.exports = urlRoute;