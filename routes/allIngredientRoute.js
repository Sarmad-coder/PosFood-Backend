const router = require("express").Router();
const {
    createIngredient,
    getIngredient,
    deleteIngredientById
} = require("../controllers/allIngredientController");

router.post("/create", createIngredient)
router.get("/getAll", getIngredient)
router.delete("/:id", deleteIngredientById)
module.exports = router;
