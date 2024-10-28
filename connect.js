const mongoose = require("mongoose");

let isConnected = false; // Track connection status

function connectMongoDB(url) {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return Promise.resolve();
  }

  return mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      isConnected = true;
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log(`Mongo Error ${err.message}`);
    });
}

module.exports = connectMongoDB;
