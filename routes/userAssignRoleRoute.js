const router = require("express").Router();
const { createUserAssginRole, getUserAssignRole, deleteUserAssignRole } = require("../controllers/userAssignRoleController");

router
    .route("/")
    .post(createUserAssginRole)
    .get(getUserAssignRole);
router.delete("/:id", deleteUserAssignRole)

module.exports = router;
