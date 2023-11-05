const Purchase = require("../models/Purchase")
const AllIngredient = require("../models/AllIngredient");
const Supplier = require("../models/Supplier");

const createPurchase = async (req, res) => {
    try {
        const { supplier, invoiceNo, purchaseDate, expiryDate, paymentMethod, detail, ingredientArr } = req.body;
        const findPur = await Purchase.find({ invoiceNo })
        if (findPur?.length > 0) {
            return res.json({ status: 404, message: "Invoice Number already Exists" })
        }
        const findSupp = await Supplier.findById(supplier)
        let supplierName = ""
        if (!findSupp) {
            return res.json({ status: 404, message: "Supplier Not Found" })
        } else {
            supplierName = findSupp?.name;
        }
        ingredientArr?.map(async (item) => {
            const selectedIng = await AllIngredient?.findByIdAndUpdate(item?.product, {
                $inc: { availableStock: item?.qty }
            }, { new: true })
            const newItem = { ...item, ingredientName: selectedIng?.ingredientName }
            await Purchase.create({ supplier, supplierName, invoiceNo, purchaseDate, expiryDate, paymentMethod, detail, ingredient: newItem })
        })
        return res.json({ status: 200, message: "Created" })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error: error })
    }
}

const getPurchases = async (req, res) => {
    try {
        const allPur = await Purchase.find({})
        if (allPur?.length === 0) {
            return res.json({ status: 404, message: "Purchase List is Empty" })
        } else {
            return res.json({ status: 200, data: allPur })
        }
    } catch (error) {
        console.log(error)
    }
}

const deletePurchaseById = async (req, res) => {
    try {
        const { id } = req.params
        const delPur = await Purchase.findByIdAndDelete(id)
        if (!delPur) {
            return res.json({ status: 404, message: "No Purchase Found" })
        } else {
            return res.json({ status: 200, message: "Deleted" })
        }
    } catch (error) {
        console.log(error)
    }
}

const searchPurchase = async (req, res) => {
    try {
        const { FromDate, ToDate } = req.body;
        const findPurchases = await Purchase.find({
            purchaseDate: {
                $gte: new Date(FromDate).toISOString(),
                $lte: new Date(ToDate).toISOString()
            }
        })
        if (findPurchases?.length === 0) {
            return res.json({ status: 404, message: "No Purchase Found" })
        } else {
            return res.json({ status: 200, data: findPurchases })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const purchaseByDay = async (req, res) => {
    try {
        const { date } = req.body;
        if (!date) {
            return res.json({ status: 404, message: "Date not Defined" })
        }
        const toDate = new Date(date);
        toDate.setDate(toDate.getDate() + 1)
        const total = await Purchase.find({
            purchaseDate: {
                $gte: new Date(date).toISOString(),
                $lt: toDate.toISOString()
            }
        })
        if (total?.length === 0) {
            return res.json({ status: 404, message: "List is empty" })
        }
        return res.json({ status: 200, data: total })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

module.exports = {
    createPurchase,
    getPurchases,
    deletePurchaseById,
    searchPurchase,
    purchaseByDay
}