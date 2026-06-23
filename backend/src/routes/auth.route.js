const express = require("express");
const {
  register,
  login,
  logout,
  updateProfile,
  cha,
  changePassword,
  changeEmail,
} = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../config/multer");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.patch(
  "/update-profile",
  verifyToken,
  upload.single("imageUrl"),
  updateProfile,
);
router.put("/change-email", verifyToken, changeEmail);
router.put("/change-password", verifyToken, changePassword);

module.exports = router;
