const inVarientIngredient = require("../models/inVarientIngredient")
const Varient = require("../models/Varient")
const AllIngredient = require("../models/AllIngredient")

const createInVarientIngredient = async (req, res) => {
    try {
        const { varient, arrayIng } = req.body
        let shouldUpdateVarient = true;
        const testArr = []
        for (const item of arrayIng) {
            const findIng = await AllIngredient.findById(item?.product);
            if (findIng?.availableStock <= 0) {
                shouldUpdateVarient = false;
                return res.json({ status: 400, message: `${findIng?.ingredientName} Stock Unavailable` });
            } else {
                testArr.push({ ...item, ingName: findIng?.ingredientName })
                // await AllIngredient.findByIdAndUpdate(item?.product, {
                //     $inc: { availableStock: -item?.qtyUsed }
                // }, { new: true });
            }
        }
        if (shouldUpdateVarient) {
            await Varient.findByIdAndUpdate(varient, {
                addIngredient: true
            }, { new: true });
            await inVarientIngredient.create({ ...req.body, arrayIng: testArr })
            return res.json({ status: 200, message: "Created" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const getInVarientIngredient = async (req, res) => {
    try {
        const allData = await inVarientIngredient.find({})
        if (allData?.length === 0) {
            return res.json({ status: 404, message: "List is Empty" })
        } else {
            return res.json({ status: 200, data: allData })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const deleteVarientIngredientById = async (req, res) => {
    try {
        const { id } = req.params
        const findData = await inVarientIngredient.findByIdAndDelete(id)
        if (!findData) {
            return res.json({ status: 404, message: "Record not Found" })
        } else {
            return res.json({ status: 200, message: "Deleted" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

module.exports = {
    createInVarientIngredient,
    getInVarientIngredient,
    deleteVarientIngredientById
}