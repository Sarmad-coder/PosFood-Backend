const router = require("express").Router();
const { upload } = require("../controllers/imageController");
const {
  createFood,
  getAllFood,
  getFoodById,
  deleteFood,
  updateFood,
  isFoodExist,
  getFoodByCategory,
} = require("../controllers/foodController");
router.route("/").get(getAllFood).post(upload.single("imageUrl"), createFood);
router.get("/catefood/:id", getFoodByCategory);
router
  .route("/:id")
  .get(isFoodExist, getFoodById)
  .patch(isFoodExist, updateFood)
  .delete(isFoodExist, deleteFood);
module.exports = router;
