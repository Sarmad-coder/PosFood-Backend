const router = require("express").Router();
const { upload } = require("../controllers/imageController");
const { getUser, createUser, deleteUser, userGetById, updateUser } = require("../controllers/userController");

router
    .route("/")
    .get(getUser)
    .post(upload.single("imageUrl"), createUser);
router.delete("/:id", deleteUser)
router.get("/getById/:id", userGetById)
router.patch("/:id", upload.single("imageUrl"), updateUser)
module.exports = router;
