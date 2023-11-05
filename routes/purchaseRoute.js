const router = require("express").Router();
const { createPurchase, getPurchases, deletePurchaseById, searchPurchase, purchaseByDay } = require("../controllers/purchaseController");

router
    .route("/")
    .post(createPurchase)
    .get(getPurchases);
router.delete("/:id", deletePurchaseById)
router.post("/search", searchPurchase)
router.post("/purchasebyday", purchaseByDay)

module.exports = router;
