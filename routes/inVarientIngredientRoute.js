const router = require("express").Router();
const { createInVarientIngredient, getInVarientIngredient, deleteVarientIngredientById } = require("../controllers/inVarientIngredientController");

router
  .route("/")
  .post(createInVarientIngredient)
  .get(getInVarientIngredient)
router.delete("/:id", deleteVarientIngredientById)
module.exports = router;
