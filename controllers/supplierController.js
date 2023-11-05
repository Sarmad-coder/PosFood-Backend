const Supplier = require("../models/Supplier")
const Purchase = require("../models/Purchase")

const createSupplier = async (req, res) => {
    try {
        const { email } = req.body;
        const findSimilarSupplier = await Supplier.find({ email })
        if (findSimilarSupplier?.length > 0) {
            return res.json({ status: 404, message: "Email Already Exists" })
        } else {
            await Supplier.create(req.body)
            return res.json({ status: 200, message: "Created" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, message: error })
    }
}

const getSuppliers = async (req, res) => {
    try {
        const allSuppliers = await Supplier.find({})
        if (allSuppliers?.length === 0) {
            return res.json({ status: 404, message: "Supplier Table is Empty" })
        } else {
            return res.json({ status: 200, data: allSuppliers })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error: error })
    }
}

const deleteSupplierById = async (req, res) => {
    try {
        const { id } = req.params;
        const delSupp = await Supplier.findByIdAndDelete(id)
        if (!delSupp) {
            return res.json({ status: 404, message: "Supplier Not Exists" })
        } else {
            return res.json({ status: 200, message: "Deleted" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error: error })
    }
}

const searchSupplier = async (req, res) => {
    try {
        const { id } = req.params
        const { FromDate, ToDate } = req.body;
        const findSupplier = await Supplier.findById(id)
        if (!findSupplier) {
            return res.json({ status: 404, message: "Supplier Data Not Found" })
        }
        const findPurchases = await Purchase.find({
            supplier: id,
            purchaseDate: {
                $gte: new Date(FromDate).toISOString(),
                $lte: new Date(ToDate).toISOString()
            }
        })
        if (findPurchases?.length === 0) {
            return res.json({ status: 404, message: "No Purchase Found" })
        } else {
            return res.json({
                status: 200, data: {
                    supplier: findSupplier,
                    purchases: findPurchases
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

module.exports = {
    createSupplier,
    getSuppliers,
    deleteSupplierById,
    searchSupplier
}