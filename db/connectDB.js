const mongoose = require("mongoose");
const connectDB = async (url) => {
  await mongoose
    .connect(url)
    .then(() => console.log("DB connected..."))
    .catch((error) => console.log(`DBError:${error}`));
};

module.exports = connectDB;
