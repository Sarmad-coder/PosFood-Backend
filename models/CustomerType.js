const mongoose = require("mongoose");
const customerTypeSchema = new mongoose.Schema({
    title: { type: String, default: "" },
});
module.exports = mongoose.model("CustomerType", customerTypeSchema);
