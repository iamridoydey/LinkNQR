const { default: mongoose } = require("mongoose");

function connectMongoDB(url) {
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(`Mongo Error ${err.message}`));
}


module.exports = connectMongoDB;