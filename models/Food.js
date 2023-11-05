const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
    category: { type: String, default: "" },
    foodName: { type: String, default: "" },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
});
module.exports = mongoose.model("Food", foodSchema);
