const CustomAPIError = require("../errors/customError");
const BadRequestError = require("../errors/badRequestError");
const AuthenticationError = require("../errors/authenticationError");
const UnAuthorizedError = require("../errors/unAuthorizedError");
const NotFoundError = require("../errors/notFoundError");
module.exports = {
  CustomAPIError,
  BadRequestError,
  AuthenticationError,
  UnAuthorizedError,
  NotFoundError,
};
