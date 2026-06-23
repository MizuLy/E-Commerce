const { prisma } = require("../config/db");

const makePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await prisma.orders.findUnique({
      where: { id: orderId },
    });

    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.userId !== req.user.id)
      return res.status(403).json({ error: "Not your order" });

    const payment = await prisma.payments.create({
      data: {
        orderId,
        amount: order.total,
        status: "PENDING",
      },
    });

    res.status(201).json({ status: "success", data: payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { makePayment };
