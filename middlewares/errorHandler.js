const { StatusCodes } = require("http-status-codes");
const errorHandler = async (err, req, res, next) => {
  const customMessage = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Internal server error",
  };

  return res.json({
    status: customMessage.statusCode,
    message: customMessage.message,
  });
};
module.exports = errorHandler;
