const router = require("express").Router();
const { createOrder, getOrder, updateOrder, deleteOrderById, cancelOrderById, updateOrderById, searchOrder, searchOrderByDay } = require("../controllers/placeOrderController");

router
    .route("/")
    .post(createOrder)
    .get(getOrder)
    .patch(updateOrder)
router.delete("/:id", deleteOrderById)
router.patch("/cancel/:id", cancelOrderById)
router.patch("/updateorder/:id", updateOrderById)
router.post("/search/:id", searchOrder)
router.post("/searchbydate", searchOrderByDay)
module.exports = router;
