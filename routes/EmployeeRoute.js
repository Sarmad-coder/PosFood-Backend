const router = require("express").Router();
const { createEmployee, getEmployee, deleteEmployee } = require("../controllers/employeeController");


router
    .route("/")
    .post(createEmployee)
    .get(getEmployee);
router.delete("/:id", deleteEmployee)
module.exports = router;
