const { getRole, createRole, deleteRole } = require("../controllers/rolePermissionController");

const router = require("express").Router();

router
    .route("/")
    .get(getRole)
    .post(createRole);
router.delete("/:id", deleteRole)

module.exports = router;
