const express = require("express");
const router = express.Router();
const orderModel = require("../models/orders");
const CartServiceModel = require("../services/cartService");
const CartItemModel = require("../models/cartItems");

router.get("", async (req, res, next) => {
  const user = req.user;
  try {
    const cart = await CartServiceModel.createCart(user);
    const orders = await orderModel.findOrderByUser(cart.cart_id);
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const user = req.user;
  const order_id = req.params.id;
  try {
    const cart = await CartServiceModel.createCart(user);
    const findOrder = await orderModel.findUniqueOrder(cart.cart_id, order_id);
    if (findOrder) {
      const cartItems = await CartItemModel.loadCartItems(cart.cart_id);
      res.send(cartItems);
    } else {
      res.send("no Order");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
