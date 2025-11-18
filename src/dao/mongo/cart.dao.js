import cartModel from "../models/cart.model.js";

class CartDAO {
  create(data) {
    return cartModel.create(data);
  }
  getById(id) {
    return cartModel.findById(id).populate("products.product").exec();
  }
  getByUserId(userId) {
    return cartModel
      .findOne({ user: userId })
      .populate("products.product")
      .exec();
  }
  updateById(id, data) {
    return cartModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  addOrUpdateProduct(cartId, productId, qty) {
    return cartModel.findById(cartId).then((cart) => {
      if (!cart) throw new Error("Cart not found");
      const item = cart.products.find(
        (p) => p.product.toString() === productId.toString()
      );
      if (item) item.quantity += qty;
      else cart.products.push({ product: productId, quantity: qty });
      return cart.save();
    });
  }
  removeProduct(cartId, productId) {
    return cartModel
      .findByIdAndUpdate(
        cartId,
        { $pull: { products: { product: productId } } },
        { new: true }
      )
      .exec();
  }
  clearProducts(cartId) {
    return cartModel
      .findByIdAndUpdate(cartId, { products: [] }, { new: true })
      .exec();
  }
}

export default CartDAO;
