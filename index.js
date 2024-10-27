const express = require("express");
const connectMongoDB = require("./connect");

// Import statement end

// PORT and mongodb connection
const PORT = 2100;
connectMongoDB("mongodb://127.0.0.1:27017/linkNQR");

// Create express App
const app = express();

// Middlewares
app.use(express.json);
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
