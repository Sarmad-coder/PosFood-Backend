const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    about: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    status: { type: String, default: "" },
});
module.exports = mongoose.model("User", userSchema);
