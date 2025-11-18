import CartRepository from "../repositories/cart.repository.js";

class CartService {
  constructor() {
    this.repo = new CartRepository();
  }

  createCart(data) {
    return this.repo.create(data);
  }
  getCartById(id) {
    return this.repo.findById(id);
  }
  getCartByUserId(userId) {
    return this.repo.findByUserId(userId);
  }
  addProduct(cartId, productId, qty) {
    return this.repo.addOrUpdateProduct(cartId, productId, qty);
  }
  removeProduct(cartId, productId) {
    return this.repo.removeProduct(cartId, productId);
  }
  clearProducts(cartId) {
    return this.repo.clearProducts(cartId);
  }
  update(cartId, data) {
    return this.repo.update(cartId, data);
  }
}

export default CartService;
