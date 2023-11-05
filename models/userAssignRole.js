const mongoose = require("mongoose");
const userRoleSchema = new mongoose.Schema({
    userId: { type: String, default: "" },
    userName: { type: String, default: "" },
    roleId: { type: String, default: "" },
    roleName: { type: String, default: "" },
});
module.exports = mongoose.model("userAssignRole", userRoleSchema);
