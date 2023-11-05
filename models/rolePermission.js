const mongoose = require("mongoose");
const rolePermissionSchema = new mongoose.Schema({
    roleName: { type: String, default: "" },
    description: { type: String, default: "" },
    foodArray: { type: [], default: [] },
    orderArray: { type: [], default: [] },
    purchaseArray: { type: [], default: [] },
    reportArray: { type: [], default: [] },
    settingArray: { type: [], default: [] },
    unitArray: { type: [], default: [] },
});
module.exports = mongoose.model("rolePermission", rolePermissionSchema);
