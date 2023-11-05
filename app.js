require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const handler = require("./utils/app-exports");
const connectDB = require("./db/connectDB");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

async function startServer() {
  await connectDB(process.env.MONGO_URL);
  app.listen(5000, () => {
    console.log(`server started at PORT ${process.env.PORT}`);
  });
}

app.use("/images", express.static("uploads"));
app.use("/api/v1/category", handler.categoryRoute);
app.use("/api/v1/food", handler.foodRoute);
app.use("/api/v1/varient", handler.varientRoute);
app.use("/api/v1/order", handler.placeOrderRoute);
app.use("/api/v1/allIngredient", handler.allIngredientRoute);
app.use("/api/v1/employee", handler.employeeRoute);
app.use("/api/v1/supplier", handler.supplierRoute);
app.use("/api/v1/purchase", handler.purchaseRoute);
app.use("/api/v1/invarientingredient", handler.inVarientIngredient);
app.use("/api/v1/orderpermission", handler.orderPermission);
app.use("/api/v1/customertype", handler.customerType);
app.use("/api/v1/currency", handler.currency);
app.use("/api/v1/user", handler.user);
app.use("/api/v1/permission", handler.rolePermission);
app.use("/api/v1/userassignrole", handler.UserAssignRole);
app.use(handler.errorHandler);
app.use(handler.notFound);
startServer();
