const express = require("express");
const { register, login, logout } = require("../controller/auth");
const {
  deleteItem,
  updateItem,
  getIdItem,
  getItem,
  addItem,
  updateItemImg,
} = require("../controller/item");
const { uploadImg } = require("../middleware/uploadImage");
const {
  deleteCustomer,
  updateCustomer,
  getIdCustomer,
  getCustomer,
  addCustomer,
  updateCustomerImg,
} = require("../controller/customer");
const {
  deleteSales,
  updateSales,
  getIdSales,
  getSales,
  addSales,
} = require("../controller/sales");
const { auth } = require("../middleware/auth");

const router = express.Router();

// AUTH
router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);

// ITEM
router.post("/item", uploadImg("barang"), addItem);
router.get("/item", getItem);
router.get("/item/:id", getIdItem);
router.patch("/item/:id", updateItem);
router.patch("/item/image/:id", uploadImg("barang"), updateItemImg);
router.delete("/item/:id", deleteItem);

// CUSTOMER
router.post("/customer", uploadImg("ktp"), addCustomer);
router.get("/customer", getCustomer);
router.get("/customer/:id", getIdCustomer);
router.patch("/customer/:id", updateCustomer);
router.patch("/customer/image/:id", uploadImg("ktp"), updateCustomerImg);
router.delete("/customer/:id", deleteCustomer);

// SALES
router.post("/sales", addSales);
router.get("/sales", getSales);
router.get("/sales/:id", getIdSales);
router.patch("/sales/:id", updateSales);
router.delete("/sales/:id", deleteSales);

module.exports = router;
