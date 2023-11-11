const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const ProductModel = require("../models/products");

router.post("", async (req, res, next) => {
  const { name, description, price, category } = req.body;
  const data = req.body;
  try {
    if (!name || !description || !price || !category)
      throw createError(404, "products Are required");
    if (!data) throw createError(404, "products Are required");
    const newProduct = await ProductModel.addProduct(data);
    res.send(newProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
