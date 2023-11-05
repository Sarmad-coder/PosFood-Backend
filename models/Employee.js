const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    fname: { type: String, default: "" },
    lname: { type: String, default: "" },
    emailAdd: { type: String, default: "" },
    phone: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    Uemail: { type: String, default: "" },
    password: { type: String, default: "" },
    country: { type: String, default: "" },
    stateOption: { type: String, default: "" },
    city: { type: String, default: "" },
}, {
    timestamps: true
});
module.exports = mongoose.model("Employee", employeeSchema);
