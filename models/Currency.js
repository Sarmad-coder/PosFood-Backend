const mongoose = require("mongoose");
const currencySchema = new mongoose.Schema({
    currency: { type: String, default: "" },
});
module.exports = mongoose.model("Currency", currencySchema);
