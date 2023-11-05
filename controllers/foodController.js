const Food = require("../models/Food");
const { BadRequestError, NotFoundError, CustomAPIError } = require("../errors");
const { deleteImageFromLocal } = require("./imageController");
async function isFoodExist(req, res, next) {
  let result;
  try {
    const FoodId = req.params.id;
    console.log(FoodId);
    result = await Food.findById(FoodId);
    console.log(result);
    if (!result) {
      //   throw new NotFoundError("Result not found");
      return res.json("Not existed");
    }
    res.result = result;
    next();
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
}
const createFood = async (req, res) => {
  try {
    // const { category, status, food } = req.body;
    console.log(req.body);
    if (!req.body) {
      //   throw new BadRequestError("Bad Request fields can't be empty");
      return res.json("Empty Body");
    }

    if (!req.file) {
      throw new BadRequestError("Please choose image file");
    } else {
      // update
      const imageUrl = req.file.filename;
      // update
      req.body.imageUrl = imageUrl;
      console.log(`tested imageURL: ${imageUrl}`);
    }
    const newFood = await Food.create(req.body);
    return res.json({ status: 200, message: "success", data: newFood });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};

const getAllFood = async (req, res) => {
  try {
    const allFoods = await Food.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    if (allFoods.length <= 0) {
      //   throw new NotFoundError("Collection is empty");
      return res.json("collection is empty");
    }
    return res.json({ status: 200, msg: "success", data: allFoods });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};

const getFoodById = async (req, res) => {
  try {
    const result = res.result;
    const { __v, createdAt, updatedAt, ...FoodInfo } = result._doc;

    return res.json({ status: 200, msg: "Success", data: FoodInfo });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};
const getFoodByCategory = async (req, res) => {
  try {
    const cateId = req.params.id;
    const result = await Food.find({ category: cateId });

    return res.json({ status: 200, msg: "Success", data: result });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};

const updateFood = async (req, res) => {
  try {
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
const deleteFood = async (req, res) => {
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
module.exports = {
  createFood,
  getAllFood,
  getFoodById,
  updateFood,
  deleteFood,
  isFoodExist,
  getFoodByCategory,
};
