const express = require("express");
const connectMongoDB = require("./connect");
const ejs = require("ejs");
const path = require("path")

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
