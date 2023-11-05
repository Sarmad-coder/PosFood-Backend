const router = require("express").Router();
const { upload } = require("../controllers/imageController");
const {
  createVarient,
  getAllVarient,
  getVarientById,
  deleteVarient,
  updateVarient,
  isVarientExist,
  getVarientByFood,
  getVarientType
} = require("../controllers/varientController");
router
  .route("/")
  .get(getAllVarient)
  .post(upload.single("imageUrl"), createVarient);
router.get("/foodVarient/:id", getVarientByFood)
router.get("/getVarientType/:id", getVarientType)
router
  .route("/:id")
  .get(isVarientExist, getVarientById)
  .patch(isVarientExist, upload.single("imageUrl"), updateVarient)
  .delete(isVarientExist, deleteVarient);
module.exports = router;
