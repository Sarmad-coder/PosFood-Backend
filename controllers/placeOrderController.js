const PlaceOrder = require("../models/PlaceOrder");
const InVarientIngredient = require("../models/inVarientIngredient")
const AllIngredient = require("../models/AllIngredient");
const Food = require("../models/Food");
const Varient = require("../models/Varient");
const Purchase = require("../models/Purchase");
const mongoose = require("mongoose")
const createOrder = async (req, res) => {
    try {
        if (!req.body) {
            return res.json("Empty Body");
        } else {
            const { order } = req.body;
            order?.map(async (item) => {
                const findInVarientIngredient = await InVarientIngredient.find({ varient: item?.productId })
                findInVarientIngredient?.map((i) => {
                    i?.arrayIng?.map(async (j) => {
                        await AllIngredient.findByIdAndUpdate(j?.product, {
                            $inc: { availableStock: -((j?.qtyUsed * item?.orderQty)) }
                        }, { new: true });
                    })
                })
            })
            const newOrder = new PlaceOrder(req.body);
            await newOrder.save();
            if (!newOrder) {
                return res.json({ status: 404, message: "Something Went Wrong" })
            } else {
                return res.json({ status: 200, message: "Order Placed Successfully", data: newOrder })
            }
        }
    } catch (error) {
        const status = error.status || 500;
        return res.json({ message: `${error.message}`, status: status });
    }
};

const getOrder = async (req, res) => {
    try {
        const allOrders = await PlaceOrder.find({})
        if (allOrders?.length === 0) {
            return res.json({ status: 404, message: "Order List is Empty" })
        } else {
            return res.json({ status: 200, data: allOrders })
        }
    } catch (error) {
        console.log(error)
    }
}

const updateOrder = async (req, res) => {
    const { orderId } = req.body;
    const findOrder = await PlaceOrder.findByIdAndUpdate(orderId,
        {
            state: 'served',
            discountType: req.body?.discountType,
            discount: req.body?.discount,
            due: req.body?.due,
            payableAmount: req.body?.payableAmount
        },
        { new: true })
    console.log(findOrder)
    return res.json({ status: 200 })
}

const deleteOrderById = async (req, res) => {
    const { id } = req.params
    const delOrder = await PlaceOrder.findByIdAndDelete(id)
    if (!delOrder) {
        return res.json({ status: 404, message: "Something Went Wrong" })
    }
    return res.json({ status: 200 })
}

const cancelOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const findOrder = await PlaceOrder.findByIdAndUpdate(id, {
            state: "cancel"
        }, { new: true })
        if (!findOrder) {
            return res.json({ status: 404, message: "Order Not Found" })
        } else {
            return res.json({ status: 200, messgae: "Cancelled", data: findOrder })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const updateOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const findOrder = await PlaceOrder.findByIdAndUpdate(id, {
            $set: req.body
        })
        if (!findOrder) {
            return res.json({ status: 404, message: "Order Not Found" })
        }
        return res.json({ status: 200, message: "Order Updated" })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const searchOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { FromDate, ToDate } = req.body;
        const toDate = new Date(ToDate);
        toDate.setDate(toDate.getDate() + 1)
        const findFood = await Food.findById(id)
        if (!findFood) {
            return res.json({ status: 404, message: "Food not Found" })
        }
        const findVarients = await Varient.find({ foodId: id })
        const varIds = findVarients.map(item => item._id?.toString())
        if (findVarients?.length === 0) {
            return res.json({ status: 404, message: "No Varient Found" })
        }
        const a = await PlaceOrder.find({
            "order.productId": {
                $in: varIds
            },
            startTime: {
                $gte: new Date(FromDate).toISOString(),
                $lt: toDate.toISOString()
            },
            state: "served"
        })
        if (a?.length === 0) {
            return res.json({ status: 404, message: "No Order Found" })
        }
        return res.json({ status: 200, data: a })
    } catch (error) {
        console.log(error)
        res.json({ status: 500, error })
    }
}

const searchOrderByDay = async (req, res) => {
    try {
        const { date } = req.body
        if (!date) {
            return res.json({ status: 404, message: "Date not Mentioned" })
        }
        const toDate = new Date(date);
        toDate.setDate(toDate.getDate() + 1)
        const findOrder = await PlaceOrder.find({
            state: "served",
            startTime: {
                $gte: new Date(date).toISOString(),
                $lt: toDate.toISOString()
            },
        })
        if (findOrder?.length === 0) {
            return res.json({ status: 404, message: "No Order Found" })
        }
        return res.json({ status: 200, data: findOrder })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

module.exports = {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrderById,
    cancelOrderById,
    updateOrderById,
    searchOrder,
    searchOrderByDay
};
