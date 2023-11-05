const CartModel = require("../models/cart");

class CartServiceModel {
  // Retrieve user cart
  async createCart(user) {
    if (!user) throw createError(404, "Not Authorized");
    const { user_id } = user;
    const cart = await CartModel.findUniqueCart(user_id);
    if (!cart) {
      const userCart = await CartModel.create(user_id);
      return userCart;
    } else {
      return cart;
    }
  }
}

module.exports = new CartServiceModel();
