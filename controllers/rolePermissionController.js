const RolePermission = require("../models/rolePermission")

const createRole = async (req, res) => {
    try {
        const { roleName } = req.body;
        const find = await RolePermission.find({ roleName })
        if (find?.length > 0) {
            return res.json({ status: 404, message: "Name already Exists" })
        }
        await RolePermission.create(req.body)
        return res.json({ status: 200, message: "Created" })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const getRole = async (req, res) => {
    try {
        const allData = await RolePermission.find({})
        if (!allData) {
            return res.json({ status: 404, message: "List is empty" })
        }
        return res.json({ status: 200, data: allData })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ status: 404, message: "Undefined" })
        }
        const delRole = await RolePermission.findByIdAndDelete(id)
        if (!delRole) {
            return res.json({ status: 404, message: "Not Found" })
        }
        return res.json({ status: 200, message: "Deleted" })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

module.exports = {
    createRole,
    getRole,
    deleteRole
}