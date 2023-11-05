const Category = require("../models/Category");
const { BadRequestError, NotFoundError, CustomAPIError } = require("../errors");
const { deleteImageFromLocal } = require("./imageController");
async function isCategoryExist(req, res, next) {
  let result;
  try {
    const CategoryId = req.params.id;
    console.log(CategoryId);
    result = await Category.findById(CategoryId);
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
const createCategory = async (req, res) => {
  try {
    if (!req.body) {
      return res.json("Empty Body");
    }
    if (!req.file) {
      throw new BadRequestError("Please choose image file");
    } else {
      const imageUrl = req.file.filename;
      req.body.imageUrl = imageUrl;
    }

    const newCategory = await Category.create(req.body);
    const { __v, createdAt, updatedAt, ...CategoryInfo } = newCategory._doc;
    return res.json({ status: 200, message: "success", data: CategoryInfo });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const allCategorys = await Category.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    if (allCategorys.length <= 0) {
      //   throw new NotFoundError("Collection is empty");
      return res.json("collection is empty");
    }
    return res.json({ status: 200, msg: "success", data: allCategorys });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const result = res.result;
    const { __v, createdAt, updatedAt, ...CategoryInfo } = result._doc;

    return res.json({ status: 200, msg: "Success", data: CategoryInfo });
  } catch (error) {
    const status = error.status || 500;
    return res.json({ message: `${error.message}`, status: status });
  }
};
const updateCategory = async (req, res) => {
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
const deleteCategory = async (req, res) => {
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
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  isCategoryExist,
};
