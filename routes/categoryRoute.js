const router = require("express").Router();
const { upload } = require("../controllers/imageController");
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
  isCategoryExist,
} = require("../controllers/categoryController");
router
  .route("/")
  .get(getAllCategory)
  .post(upload.single("imageUrl"), createCategory);
router
  .route("/:id")
  .get(isCategoryExist, getCategoryById)
  .patch(isCategoryExist, upload.single("imageUrl"), updateCategory)
  .delete(isCategoryExist, deleteCategory);
module.exports = router;
