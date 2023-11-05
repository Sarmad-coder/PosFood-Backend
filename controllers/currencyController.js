const Currency = require("../models/Currency")

const CreateCurrency = async (req, res) => {
    try {
        const { currency } = req.body;
        if (!currency) {
            return res.json({ status: 404, message: "Currency not Mentioned" })
        }
        const existingData = await Currency.find({});
        if (existingData?.length > 0) {
            await Currency.deleteMany({});
            const newCurrency = new Currency({ currency });
            await newCurrency.save();
            return res.json({ status: 200, message: 'Curreny Replaced' });
        } else {
            const newCurrency = new Currency({ currency });
            await newCurrency.save();
            return res.json({ status: 200, message: 'Curreny Saved' });
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const GetCurrency = async (req, res) => {
    try {
        const data = await Currency.find({})
        if (data?.length === 0) {
            return res.json({ status: 404, message: "List is Empty" })
        }
        return res.json({ status: 200, data: data })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

const DeleteCurrency = async (req, res) => {
    try {
        const { id } = req.params;
        const delData = await Currency.findByIdAndDelete(id)
        if (!delData) {
            return res.json({ status: 404, message: "Not Found" })
        }
        return res.json({ status: 200, message: "Deleted" })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, error })
    }
}

module.exports = {
    CreateCurrency,
    GetCurrency,
    DeleteCurrency
}