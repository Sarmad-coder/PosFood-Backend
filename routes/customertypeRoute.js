const router = require("express").Router();
const { CreateCustomerType, GetCustomerType, DeleteCustomerType, UpdateCustomerType } = require("../controllers/customerTypeController");

router
    .route("/")
    .post(CreateCustomerType)
    .get(GetCustomerType);
router.delete("/:id", DeleteCustomerType);
router.patch("/:id", UpdateCustomerType);

module.exports = router;
