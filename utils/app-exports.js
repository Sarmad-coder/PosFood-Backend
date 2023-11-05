const categoryRoute = require("../routes/categoryRoute");
const foodRoute = require("../routes/foodRoute");
const varientRoute = require("../routes/varientRoute");
const placeOrderRoute = require("../routes/placeOrderRoute");
const allIngredientRoute = require("../routes/allIngredientRoute");
const employeeRoute = require("../routes/EmployeeRoute.js");
const supplierRoute = require("../routes/supplierRoute.js");
const purchaseRoute = require("../routes/purchaseRoute.js");
const inVarientIngredient = require("../routes/inVarientIngredientRoute.js");
const orderPermission = require("../routes/orderPermissionRoute.js");
const customerType = require("../routes/customertypeRoute.js");
const currency = require("../routes/currencyRoute.js");
const user = require("../routes/userRoute.js");
const rolePermission = require("../routes/rolePermissionRoute.js");
const UserAssignRole = require("../routes/userAssignRoleRoute.js");
const notFound = require("../middlewares/notFound");
const errorHandler = require("../middlewares/errorHandler");
module.exports = {
  categoryRoute,
  foodRoute,
  varientRoute,
  placeOrderRoute,
  notFound,
  errorHandler,
  allIngredientRoute,
  employeeRoute,
  supplierRoute,
  purchaseRoute,
  inVarientIngredient,
  orderPermission,
  customerType,
  currency,
  user,
  rolePermission,
  UserAssignRole
};
