const { prisma } = require("../config/db");
const uploadImage = require("../utils/uploadImage");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stockQuantity,
      category,
      featured,
      discountPrice,
    } = req.body;
    let imageUrl;

    if (!name || !price || !stockQuantity || !category || !req.file)
      return res.status(400).json({ error: "All fields are required" });

    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer);
    }

    const product = await prisma.products.create({
      data: {
        name,
        description,
        price: parseFloat(price), // parseFloat cuz it count as string in form-data
        stockQuantity: parseInt(stockQuantity), // Same thing
        imageUrl,
        category,
        featured: featured === "true" || false,
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Product added",
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity,
        imageUrl: product.imageUrl,
        category: product.category,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { category, featured, sort } = req.query;

    const page = parseInt(req.query.page) || 1; // which page, default 1
    const limit = parseInt(req.query.limit) || 8; // how many per page, default 8
    const skip = (page - 1) * limit; // how many products to skip

    const where = {};
    if (category) where.category = category;
    if (featured === "true") where.featured = true;

    const orderBy = {};
    if (sort === "popular") orderBy.soldCount = "desc";
    if (sort === "trending") orderBy.views = "desc";
    if (sort === "new") orderBy.createdAt = "desc";

    // run both queries at the same time (faster)
    const [products, total] = await Promise.all([
      prisma.products.findMany({ where, orderBy, skip, take: limit }), // fetch 8 products
      prisma.products.count({ where }), // count total products
    ]);

    res.status(200).json({
      status: "success",
      data: products,
      pagination: {
        total, // e.g. 50 total products
        page, // current page
        limit, // products per page
        totalPages: Math.ceil(total / limit), // 50/8 = 6.25 → rounds up to 7
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stockQuantity,
      category,
      featured,
      discountPrice,
    } = req.body;

    const product = await prisma.products.findUnique({
      where: { id: req.params.id },
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (stockQuantity !== undefined)
      updateData.stockQuantity = parseInt(stockQuantity);
    if (category !== undefined) updateData.category = category;
    if (featured !== undefined)
      updateData.featured = featured === "true" || false;
    if (discountPrice !== undefined)
      updateData.discountPrice = discountPrice
        ? parseFloat(discountPrice)
        : null;

    if (req.file) updateData.imageUrl = await uploadImage(req.file.buffer);

    const result = await prisma.products.update({
      where: { id: product.id },
      data: updateData,
    });

    res.status(200).json({
      status: "success",
      message: "Product updated",
      data: {
        id: result.id,
        name: result.name,
        description: result.description,
        price: result.price,
        stockQuantity: result.stockQuantity,
        imageUrl: result.imageUrl,
        category: result.category,
        featured: result.featured,
        discountPrice: result.discountPrice,
        views: result.views,
        soldCount: result.soldCount,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await prisma.products.findUnique({
      where: { id: req.params.id },
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    await prisma.products.delete({
      where: { id: product.id },
    });

    res.status(200).json({ status: "success", message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const incrementView = async (req, res) => {
  try {
    const product = await prisma.products.update({
      where: { id: req.params.id },
      data: { views: { increment: 1 } },
    });

    res.json({ status: "success", data: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  removeProduct,
  incrementView,
};
