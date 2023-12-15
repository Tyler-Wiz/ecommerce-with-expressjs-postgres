const ProductModel = require("../models/products");
const joi = require("joi");
const createError = require("http-errors");

exports.read = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

exports.readUnique = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    const product = await ProductModel.findUnique(product_id);
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};

exports.addProducts = async (req, res, next) => {
  const data = req.body;
  const schema = joi.array().items({
    name: joi.string().required(),
    description: joi.string().required(),
    features: joi.string().required(),
    price: joi.string().required(),
    keywords: joi.string().required(),
    url: joi.string().required(),
    category: joi.string().required(),
    subcategory: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  try {
    if (error) throw createError(404, "products Are required");
    const newProduct = await ProductModel.addMultipleProducts(data);
    res.send(newProduct);
  } catch (err) {
    next(err);
  }
};
