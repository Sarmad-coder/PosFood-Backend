const User = require("../models/User")

const createUser = async (req, res) => {
    try {
        const { email } = req.body;
        const findEmail = await User.find({ email })
        if (findEmail?.length > 0) {
            return res.json({ status: 404, message: "Email is already exists" })
        }
        if (!req.file) {
            return res.json({ status: 404, message: "Please choose image file" })
        } else {
            const imageUrl = req.file.filename;
            req.body.imageUrl = imageUrl;
        }
        await User.create(req.body);
        return res.json({ status: 200, message: "Created" })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const getUser = async (req, res) => {
    try {
        const allData = await User.find({})
        if (allData?.length === 0) {
            return res.json({ status: 404, message: "List is empty" })
        }
        return res.json({ status: 200, data: allData })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const delUser = await User.findByIdAndDelete(id)
        if (!delUser) {
            return res.json({ status: 404, message: "Not Found" })
        } else {
            return res.json({ status: 200, message: "Deleted" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const userGetById = async (req, res) => {
    try {
        const { id } = req.params;
        const find = await User.findById(id)
        if (!find) {
            return res.json({ status: 404, message: "Not Found" })
        }
        return res.json({ status: 200, data: find })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const findUser = await User.findById(id)
        if (!findUser) {
            return res.json({ status: 404, message: "Not Found" })
        }
        if (!req.file.filename) {
            return res.json({ status: 404, message: "Image Not Defined" })
        } else {
            const imageUrl = req.file.filename;
            req.body.imageUrl = imageUrl;
        }
        const updatedResult = await User.findByIdAndUpdate(id,
            {
                $set: req.body,
            },
            {
                new: true,
            }
        );
        if (!updatedResult) {
            return res.json("updation failed");
        }
        return res.json({ status: 200, message: "Updated" });

    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    userGetById,
    updateUser
}