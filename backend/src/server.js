const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const { connectDB, disconnectDB } = require("./config/db");
const { config } = require("dotenv");

const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/product.route");
const orderRoute = require("./routes/order.route");
const paymentRoute = require("./routes/payment.route");

const otpRoute = require("./routes/otp.route");

config();
connectDB();

const PORT = process.env.PORT || 6969;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/otp", otpRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
