const express = require("express");
const router = express.Router();

const ProductModel = require("../models/products");

router.get("/", async (req, res) => {
  const { name, category } = req.query;
  const products = await ProductModel.findMany();

  let filerResult = products;

  if (products.length > 1) {
    if (category) {
      filerResult = filerResult.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (name) {
      filerResult = filerResult.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    res.send(filerResult);
  } else {
    res.send(products);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findUnique(id);
  res.status(200).send(product);
});

module.exports = router;
