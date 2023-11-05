const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  categoryName: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
});
module.exports = mongoose.model("Category", categorySchema);
