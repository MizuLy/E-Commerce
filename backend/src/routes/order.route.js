const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  addOrder,
  getOrders,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.post("/", verifyToken, addOrder);
router.get("/", verifyToken, getOrders);
router.patch("/:id", verifyToken, cancelOrder);

// ====ADMIN====
router.get("/all", verifyToken, isAdmin, getAllOrders);
router.patch("/status/:id", verifyToken, isAdmin, updateOrderStatus);

module.exports = router;
