const User = require("../models/User");
const RolePermission = require("../models/rolePermission");
const UserAssignRole = require("../models/userAssignRole");

const createUserAssginRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        const findUser = await User.findById(userId)
        if (!findUser) {
            return res.json({ status: 404, message: "User Not Found" })
        }
        const findRole = await RolePermission.findById(roleId)
        if (!findRole) {
            return res.json({ status: 404, message: "Role Not Found" })
        }
        await UserAssignRole.create(req.body)
        return res.json({ status: 200, message: "Created" })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const getUserAssignRole = async (req, res) => {
    try {
        const allData = await UserAssignRole.find({})
        if (allData?.length === 0) {
            return res.json({ status: 404, message: "List is Empty" })
        }
        return res.json({ status: 200, data: allData })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const deleteUserAssignRole = async (req, res) => {
    try {
        const { id } = req.params;
        const delData = await UserAssignRole.findByIdAndDelete(id)
        if (!delData) {
            return res.json({ status: 404, message: "Not Found" })
        } else {
            return res.json({ status: 200, message: "Deleted" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

module.exports = {
    createUserAssginRole,
    getUserAssignRole,
    deleteUserAssignRole
}