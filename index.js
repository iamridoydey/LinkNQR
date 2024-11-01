require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const express = require("express");
const connectMongoDB = require("./connect");
const path = require("path");
const cookieParser = require("cookie-parser");
const staticRoute = require("./routes/static.route");
const userRoute = require("./routes/user.route");
const urlRoute = require("./routes/url.route");
const { validUser, checkAuth } = require("./middlewares/user.auth");

// Import statement end

// PORT and mongodb connection
const PORT = 2100;

// Create express App
const app = express();

// MongoDB connection
app.use(async (req, res, next) => {
  await connectMongoDB(process.env.MONGO_URI);
  next();
});

// Set Up views (ejs)
// Serve static files from the "public" directory
app.use(cors())
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middlewares with route
app.use("/", checkAuth, staticRoute);
app.use("/", userRoute);
app.use("/", validUser, urlRoute);

// app.listen(PORT, () => {
//   console.log(`Server started at http://localhost:${PORT}`);
// });

module.exports = app;
