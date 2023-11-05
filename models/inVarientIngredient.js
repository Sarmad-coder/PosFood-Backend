const mongoose = require("mongoose");
const inVarientIngredientSchema = new mongoose.Schema({
  category: { type: String, default: "" },
  food: { type: String, default: "" },
  varient: { type: String, default: "" },
  varientType: { type: String, default: "" },
  arrayIng: { type: [] },
});
module.exports = mongoose.model("inVarientIngredient", inVarientIngredientSchema);
