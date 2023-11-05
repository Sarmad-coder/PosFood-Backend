const mongoose = require("mongoose");
const orderPermissionSchema = new mongoose.Schema({
    permissionType: { type: String, default: "" },
    waiter: { type: Boolean, default: false },
    table: { type: Boolean, default: false },
    cookingTime: { type: Boolean, default: false },
    tableMap: { type: Boolean, default: false },
    soundEnabled: { type: Boolean, default: false }
});
module.exports = mongoose.model("OrderPermission", orderPermissionSchema);
