const mongoose = require("mongoose");
const supplierSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
});
module.exports = mongoose.model("Supplier", supplierSchema);
