const CartModel = require("../models/cart");

const createCart = async (user) => {
  if (!user) throw createError(404, "Not Authorized");
  const { user_id } = user;
  const cart = await CartModel.findUniqueCart(user_id);
  if (!cart) {
    const userCart = await CartModel.create(user_id);
    return userCart;
  } else {
    return cart;
  }
};
