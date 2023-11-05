const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
    supplier: { type: String, default: "" },
    supplierName: { type: String, default: "" },
    invoiceNo: { type: String, default: "" },
    purchaseDate: { type: String, default: "" },
    expiryDate: { type: String, default: "" },
    paymentMethod: { type: String, default: "" },
    detail: { type: String, default: "" },
    ingredient: { type: {} },
});
module.exports = mongoose.model("Purchase", purchaseSchema);
