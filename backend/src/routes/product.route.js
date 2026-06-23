const express = require("express");
const {
  addProduct,
  getProducts,
  updateProduct,
  removeProduct,
} = require("../controllers/product.controller");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../config/multer");

const router = express.Router();

router.post("/", verifyToken, upload.single("imageUrl"), addProduct);
router.get("/", getProducts); // /api/products?page=1-100
router.patch("/:id", verifyToken, upload.single("imageUrl"), updateProduct);
router.delete("/:id", verifyToken, removeProduct);

module.exports = router;
