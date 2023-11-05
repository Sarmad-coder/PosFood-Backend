const Employee = require("../models/Employee")

const createEmployee = async (req, res) => {
    try {
        const { emailAdd } = req.body
        const findSimilarEmail = await Employee.find({ emailAdd })
        if (findSimilarEmail?.length > 0) {
            return res.json({ status: 400, message: "Email Already Exists" })
        } else {
            const data = await Employee.create(req.body)
            return res.json({ status: 200, message: "Created", data: data })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, message: error })
    }
}

const getEmployee = async (req, res) => {
    try {
        const allEmployee = await Employee.find({})
        if (allEmployee?.length === 0) {
            return res.json({ status: 200, message: "Employee Table is Empty" })
        } else {
            return res.json({ status: 200, data: allEmployee })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error: error })
    }
}

const deleteEmployee = async (req, res) => {
    const { id } = req.params
    const findEmp = await Employee.findByIdAndDelete(id)
    if (!findEmp) {
        return res.json({ status: 200, message: "Id Not Exists" })
    } else {
        return res.json({ status: 200, id: findEmp, message: "Deleted" })
    }
}

module.exports = {
    createEmployee,
    getEmployee,
    deleteEmployee
}