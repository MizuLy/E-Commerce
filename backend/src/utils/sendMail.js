const transporter = require("../config/otp");

const sendOtp = async (email, otp) => {
  await transporter.sendMail({
    from: `"Mizu Co.Ltd" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. Expires in 5 minutes.`,
  });
};

const sendSuccess = async (email) => {
  await transporter.sendMail({
    from: `"Mizu Co.Ltd" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Register success",
    text: `You can now log into your account`,
  });
};

module.exports = { sendOtp, sendSuccess };
