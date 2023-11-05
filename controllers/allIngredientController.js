const AllIngredient = require("../models/AllIngredient");
const { BadRequestError, NotFoundError, CustomAPIError } = require("../errors");
const { deleteImageFromLocal } = require("./imageController");

const createIngredient = async (req, res) => {
    try {
        const { ingredientName } = req.body;
        const findSimilarIng = await AllIngredient.find({ ingredientName })
        if (findSimilarIng?.length > 0) {
            return res.json({ status: 404, message: "Unit Name Exists" })
        } else {
            await AllIngredient.create(req.body);
            return res.json({ status: 200, message: "Created" })
        }
    } catch (error) {
        const status = error.status || 500;
        return res.json({ message: `${error.message}`, status: status });
    }
};

const getIngredient = async (req, res) => {
    try {
        const allIng = await AllIngredient.find({});
        return res.json({ status: 200, data: allIng })
    } catch (error) {
        const status = error.status || 500;
        return res.json({ message: `${error.message}`, status: status });
    }
};

const deleteIngredientById = async (req, res) => {
    try {
        const { id } = req.params
        const delIng = await AllIngredient.findByIdAndDelete(id);
        return res.json({ status: 200, message: "Deleted", data: delIng })
    } catch (error) {
        const status = error.status || 500;
        return res.json({ message: `${error.message}`, status: status });
    }
};

module.exports = {
    createIngredient,
    getIngredient,
    deleteIngredientById
};
