const CustomerType = require("../models/CustomerType")

const CreateCustomerType = async (req, res) => {
    try {
        const { title } = req.body
        if (!title) {
            return res.json({ status: 404, message: "Title not Found" })
        }
        const findTitle = await CustomerType.find({ title: title })
        if (findTitle?.length > 0) {
            return res.json({ status: 404, message: "Same Name Found" })
        }
        await CustomerType.create(req.body)
        return res.json({ status: 200, message: "Created" })
    } catch (error) {
        console.log(error)
        res.json({ status: 500, error })
    }
}

const GetCustomerType = async (req, res) => {
    try {
        const allData = await CustomerType.find({})
        if (allData?.length === 0) {
            return res.json({ status: 404, message: "List is Empty" })
        }
        return res.json({ status: 200, data: allData })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const DeleteCustomerType = async (req, res) => {
    try {
        const { id } = req.params;
        const find = await CustomerType.findByIdAndDelete(id)
        if (!find) {
            return res.json({ status: 404, message: "Customer Type not Found" })
        }
        return res.json({ status: 200, message: "Deleted" })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const UpdateCustomerType = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = await CustomerType.findByIdAndUpdate(id, req.body, { new: true })
        if (!updateData) {
            return res.json({ status: 404, message: "Not Found" })
        } else {
            return res.json({ status: 200, message: "Updated" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

module.exports = {
    CreateCustomerType,
    GetCustomerType,
    DeleteCustomerType,
    UpdateCustomerType
}