const express = require("express");
const router = express.Router();

const ProductModel = require("../models/products");

router.get("/", async (req, res) => {
  const { name, category } = req.query;
  // Get All Products from Database
  const products = await ProductModel.findMany();
  // Filter all Products with category in Database
  let filerResult = products;
  if (products.length > 1) {
    if (category) {
      filerResult = filerResult.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    // Filter all Products with name in Database
    if (name) {
      filerResult = filerResult.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    // Send filtered Products to client
    res.send(filerResult);
  } else {
    // Send all Products to client
    res.send(products);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findUnique(id);
  res.status(200).send(product);
});

module.exports = router;
