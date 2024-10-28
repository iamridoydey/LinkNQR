const { init }  = require("@paralleldrive/cuid2")
const UrlModel = require("../models/url.model");

// Check whether URL is valid or not
function isValidURL(url) {
  try {
    new URL(url); // Using the global URL constructor
    return true;
  } catch (_) {
    return false;
  }
}

// Create Short ID generator
const generateShortId = init({
  length: 8,
  fingerprint: "a-custom-host-fingerprint",
});

async function handleOnPost(req, res) {
  const { url } = req.body;

  // Check if the URL is valid or not
  if (!isValidURL(url)) {
    return res.render("home", { info: "Not A Valid URL!" });
  }

  // If it is a valid URL, then generate a shortId
  const shortId = generateShortId();

  try {
    // Create a new URL document
    const newUrl = await UrlModel.create({
      shortId,
      redirectURL: url,
      createdBy: req.user._id,
      visitHistory: [],
    });

    if (!newUrl) {
      return res.render("login");
    }

    return res.render("home", { url: newUrl });
  } catch (err) {
    return res.render("home", { info: "Error Creating Short URL" });
  }
}

// Update visit history by clicking on the link
async function redirectToOriginalUrl(req, res) {
  const { shortId } = req.params;

  try {
    // Find the URL object with this shortId and update visit history
    const entry = await UrlModel.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      },
      { new: true } // Return the updated entry
    );

    // If the entry doesn't exist, render a 404 page
    if (!entry) {
      return res.render("404", { info: "Short URL Not Found!" });
    }

    // Redirect to the original URL
    return res.redirect(entry.redirectURL);
  } catch (err) {
    return res.render("404", { info: "Not A Valid URL!" });
  }
};

async function getAnalytics (req, res){
  const user = req.user;
  // If the user is not valid
  if (!user) return res.render("/login");

  // Find all the urls for that user
  const allUrl = await UrlModel.find({createdBy: user._id})

  return res.render("analytics", { urls: allUrl });
};

module.exports = {
  handleOnPost,
  redirectToOriginalUrl,
  getAnalytics
};
