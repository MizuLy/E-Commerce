const express = require("express");
const { makePayment } = require("../controllers/payment.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, makePayment);

module.exports = router;
