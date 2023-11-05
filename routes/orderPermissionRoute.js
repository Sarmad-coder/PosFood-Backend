const router = require("express").Router();
const { createOrderPermission, getOrderPermission } = require("../controllers/orderPermissionController")

router
    .route("/")
    .post(createOrderPermission)
    .get(getOrderPermission)

module.exports = router;
