const Varient = require("../models/Varient");
const { BadRequestError, NotFoundError, CustomAPIError } = require("../errors");
const { deleteImageFromLocal } = require("./imageController");
async function isVarientExist(req, res, next) {
  let result;
  try {
    const VarientId = req.params.id;
    console.log(VarientId);
    result = await Varient.findById(VarientId);
    console.log(result);
    if (!result) {
      throw new NotFoundError("Result not found");
      //   return res.json("Not existed");
    }
    res.result = result;
    next();
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
}
const createVarient = async (req, res) => {
  try {
    const imageUrl = req.file.filename;
    let newArr = [];
    if (req.body.price == 0) {
      newArr = JSON.parse(req.body.types)
    }
    if (!req.file) {
      throw new BadRequestError("Please choose image file");
    } else {
      const imageUrl = req.file.filename;
      req.body.imageUrl = imageUrl;
      req.body.types = newArr
    }
    const newVarient = await Varient.create(req.body);
    return res.json({ status: 200, message: "success", data: newVarient });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};

const getAllVarient = async (req, res) => {
  try {
    const allVarients = await Varient.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    if (allVarients.length <= 0) {
      throw new NotFoundError("Collection is empty");
      //   return res.json("collection is empty");
    }
    return res.json({ status: 200, msg: "success", data: allVarients });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};

const getVarientById = async (req, res) => {
  try {
    const result = res.result;
    const { __v, createdAt, updatedAt, ...VarientInfo } = result._doc;

    return res.json({ status: 200, msg: "Success", data: VarientInfo });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};
const updateVarient = async (req, res) => {
  try {
    if (!req.file.filename) {
    } else {
      const imageUrl = req.file.filename;
      req.body.imageUrl = imageUrl;
    }
    const updatedResult = await res.result.updateOne(
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
    return res.json({ status: 200, msg: "Success", data: updatedResult });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};
const deleteVarient = async (req, res) => {
  try {
    const deletedResult = await res.result.deleteOne();
    if (!deletedResult) {
      return res.json("deleted failed");
    }
    const { __v, createdAt, updatedAt, ...resultInfo } = deletedResult._doc;
    const imageUrl = resultInfo.imageUrl;
    const isDeleted = await deleteImageFromLocal(imageUrl);
    if (isDeleted) {
      console.log(`${imageUrl} is deleted from LocalServer`);
    }
    return res.json({
      status: 200,
      msg: "Record deleted successfuly",
      data: resultInfo,
    });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};
const getVarientByFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const result = await Varient.find({ foodId: foodId });
    return res.json({ status: 200, msg: "Success", data: result });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};
const getVarientType = async (req, res) => {
  try {
    const { id } = req.params
    const result = await Varient.findById(id)
    return res.json({ status: 200, msg: "Success", data: result });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
}
module.exports = {
  createVarient,
  getAllVarient,
  getVarientById,
  updateVarient,
  deleteVarient,
  isVarientExist,
  getVarientByFood,
  getVarientType
};
