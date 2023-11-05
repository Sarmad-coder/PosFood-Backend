const mongoose = require("mongoose");
const varientSchema = new mongoose.Schema(
  {
    foodId: { type: String, ref: "Food" },
    varientName: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    price: { type: Number, default: 0 },
    types: { type: [] },
    addIngredient: { type: Boolean, default: false }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Varient", varientSchema);
