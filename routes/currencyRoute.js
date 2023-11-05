const router = require("express").Router();
const { CreateCurrency, GetCurrency, DeleteCurrency } = require("../controllers/currencyController");

router
    .route("/")
    .post(CreateCurrency)
    .get(GetCurrency);
router.delete("/:id", DeleteCurrency)

module.exports = router;
