const router = require("express").Router();
const { createSupplier, getSuppliers, deleteSupplierById, searchSupplier } = require("../controllers/supplierController");


router
    .route("/")
    .post(createSupplier)
    .get(getSuppliers)
router.delete("/:id", deleteSupplierById)
router.post("/search/:id", searchSupplier)
module.exports = router;
