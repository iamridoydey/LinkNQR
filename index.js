const express = require("express");
const connectMongoDB = require("./connect");
const path = require("path");
const cookieParser = require("cookie-parser")
const staticRoute = require("./routes/static.route");
const userRoute = require("./routes/user.route");

// Import statement end

// PORT and mongodb connection
const PORT = 2100;
connectMongoDB("mongodb://127.0.0.1:27017/linkNQR");

// Create express App
const app = express();

// Set Up views (ejs)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

// Middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middlewares with route
app.use("/", userRoute)
app.use("/", staticRoute)


app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
