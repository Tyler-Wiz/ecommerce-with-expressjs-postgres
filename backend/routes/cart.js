const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const CartItemModel = require("../models/cartItems");
const CartServiceModel = require("../services/cartService");

router.post("", async (req, res, next) => {
  try {
    // get product ID
    const { product_id } = req.body;
    if (!product_id) throw createError(400, "No Product Added");
    // Get user from session
    const user = req.user;
    // Create or Retrieve User Cart
    const cart = await CartServiceModel.createCart(user);
    // Check if Product Exist in User CartItem
    const itemInCart = await CartItemModel.checkIfItemExist(
      product_id,
      cart.cart_id
    );
    // If Product exist Increment product or Add Product if false
    if (itemInCart.count > 0) {
      await CartItemModel.incrementItemBy1(product_id, cart.cart_id);
      res.status(200).send("Product Added");
    } else {
      const addItemToCart = await CartItemModel.addItemToCart(
        cart.cart_id,
        product_id
      );
      res.send(addItemToCart);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/items", async (req, res, next) => {
  const user = req.user;
  try {
    // Get user cart by ID from session
    const cart = await CartServiceModel.createCart(user);
    //Retrieve all Items in User Cart
    const cartItems = await CartItemModel.loadCartItems(cart.cart_id);
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

router.get("/items/:id", async (req, res, next) => {
  try {
    const cart_item_id = req.params.id;
    //Retrieve all Single Item in User Cart
    const cartItem = await CartItemModel.findUniqueItem(cart_item_id);
    res.send(cartItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
