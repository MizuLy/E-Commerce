const { prisma } = require("../config/db");

const addOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body; // productId, quantity

    // Fetch product prices from DB
    const products = await prisma.products.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
      select: {
        id: true,
        price: true,
        stockQuantity: true,
      },
    });

    // Check stock
    const stock = items.find((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product.stockQuantity < item.quantity;
    });

    if (stock) return res.status(400).json({ error: "Out of stock" });

    // Decrement stock
    await Promise.all(
      items.map((item) =>
        prisma.products.update({
          where: { id: item.productId },
          data: { stockQuantity: { decrement: item.quantity } },
        }),
      ),
    );

    // Increment soldCount
    await Promise.all(
      items.map(({ productId, quantity }) =>
        prisma.products.update({
          where: { id: productId },
          data: { soldCount: { increment: quantity } },
        }),
      ),
    );

    // Calculate total
    const total = items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + product.price * item.quantity;
    }, 0);

    const order = await prisma.orders.create({
      data: {
        userId,
        total,
        status: "PENDING",
        orderItem: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return {
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: product.price,
            };
          }),
        },
      },
      include: { orderItem: true },
    });

    res.status(201).json({ status: "success", data: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const result = await prisma.orders.findMany({
      where: { userId: req.user.id },
      include: {
        orderItem: true,
      },
    });

    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await prisma.orders.findUnique({
      where: { id: req.params.id },
      include: {
        orderItem: true,
      },
    });

    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.userId !== req.user.id)
      return res.status(403).json({ error: "Not your order" });
    if (order.status !== "PENDING")
      return res.status(400).json({ error: "Can only cancel pending order" });

    await Promise.all(
      order.orderItem.map((item) =>
        prisma.products.update({
          where: { id: item.productId },
          data: { stockQuantity: { increment: item.quantity } },
        }),
      ),
    );

    await prisma.orders.update({
      where: { id: order.id },
      data: { status: "CANCELLED" },
    });

    res.status(200).json({ status: "success", message: "Order cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====ADMIN====
const getAllOrders = async (req, res) => {
  try {
    const results = await prisma.orders.findMany({
      include: { orderItem: true },
    });

    res.status(200).json({ status: "success", data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await prisma.orders.findUnique({
      where: { id: req.params.id },
    });

    if (!order) return res.status(404).json({ error: "Order not found" });

    const updated = await prisma.orders.update({
      where: { id: order.id },
      data: { status },
    });

    res.status(200).json({
      status: "success",
      message: `Updated status to ${updated.status}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addOrder,
  getOrders,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};
