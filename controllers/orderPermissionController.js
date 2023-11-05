const OrderPermission = require("../models/OrderPermission");

const createOrderPermission = async (req, res) => {
    try {
        const { permissionType } = req.body;
        const allData = await OrderPermission.find({ permissionType })
        if (allData?.length === 0) {
            await OrderPermission.create(req.body)
        } else {
            await OrderPermission.deleteMany({ permissionType });
            await OrderPermission.create(req.body);
        }
        return res.json({ status: 200, message: "Permission Created" })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const getOrderPermission = async (req, res) => {
    try {
        const allData = await OrderPermission.find({})
        if (allData?.length === 0) {
            return res.json({ status: 404, message: "List in Empty" })
        } else {
            return res.json({ status: 200, data: allData })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

module.exports = {
    createOrderPermission,
    getOrderPermission
};