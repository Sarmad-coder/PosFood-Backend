const mongoose = require("mongoose");
const placeOrderSchema = new mongoose.Schema({
    customer: { type: String, default: "" },
    customerType: { type: String, default: "" },
    table: { type: String, default: "" },
    waiter: { type: String, default: "" },
    order: { type: [] },
    orderNumber: { type: Number, default: 0 },
    tokenNumber: { type: Number, default: 0 },
    state: { type: String, default: "pending" },
    totalAmount: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    discountType: { type: String, default: "" },
    payableAmount: { type: Number, default: 0 },
    due: { type: Number, default: 0 },
    startTime: { type: String, default: "" }
}, {
    timestamps: true
});

placeOrderSchema.pre("save", async function (next) {
    try {
        if (!this.isNew) {
            return next();
        }
        const highestOrderOrder = await this.constructor.findOne({}, { orderNumber: 1 }).sort({ orderNumber: -1 });
        if (highestOrderOrder) {
            this.orderNumber = highestOrderOrder.orderNumber + 1;
        } else {
            this.orderNumber = 1;
        }
        return next();
    } catch (error) {
        return next(error);
    }
});
module.exports = mongoose.model("PlaceOrder", placeOrderSchema);
