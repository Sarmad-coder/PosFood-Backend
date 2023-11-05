const mongoose = require("mongoose");
const allIngredientSchema = new mongoose.Schema({
    unitName: { type: String, default: "" },
    ingredientName: { type: String, default: "" },
    stockLvl: { type: Number, default: 0 },
    availableStock: { type: Number, default: 0 },
    status: { type: String, default: "active" },
});
module.exports = mongoose.model("allIngredient", allIngredientSchema);
