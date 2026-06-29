const { prisma } = require("../config/db");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const uploadImage = require("../utils/uploadImage");
const { sendOtp, sendSuccess } = require("../utils/sendMail");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const isExist = await prisma.users.findUnique({
      where: { email: email },
    });

    if (isExist) return res.status(400).json({ error: "Email already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // First user = ADMIN automatically, after that CUSTOMER
    const userCount = await prisma.users.count();

    const result = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userCount === 0 ? "ADMIN" : "CUSTOMER",
      },
    });

    // Code sent
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Confirmation sent
    await prisma.otps.create({ data: { email, otp: otpCode, expiresAt } });
    sendOtp(email, otpCode).catch(console.error);

    res.status(201).json({
      status: "success",
      message: "Registered successfully!",
      data: {
        id: result.id,
        name: name,
        email: email,
        role: result.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { email: email },
    });

    if (user === null)
      return res.status(404).json({ error: "User doesn't exist" });
    if (!user.isVerified)
      return res.status(401).json({ error: "Please verify your email first" });

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = await generateToken(user.id, res);

    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ status: "success", message: "Logged out success" });
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (req.file) updateData.imageUrl = await uploadImage(req.file.buffer);

    const user = await prisma.users.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        imageUrl: true,
      },
    });

    res.status(200).json({ status: "success", data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changeEmail = async (req, res) => {
  try {
    const { newEmail, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
    });

    // Validate password
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword)
      return res.status(401).json({ error: "Incorrect password" });

    // Check if email already taken
    const isExist = await prisma.users.findUnique({
      where: { email: newEmail },
    });

    if (isExist) return res.status(400).json({ error: "Email already taken" });

    await prisma.users.update({
      where: { id: user.id },
      data: { email: newEmail },
    });

    res.status(200).json({ status: "success", message: "Email updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
    });

    const isPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isPassword)
      return res.status(401).json({ error: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({ status: "success", message: "Password updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  updateProfile,
  changeEmail,
  changePassword,
};
