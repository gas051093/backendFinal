import CartDAO from "../dao/mongo/cart.dao.js";

class CartRepository {
  constructor() {
    this.dao = new CartDAO();
  }
  all() { 
    return this.dao.all();
  }
  create(data) {
    return this.dao.create(data);
  }
  findById(id) {
    return this.dao.getById(id);
  }
  findByUserId(userId) {
    return this.dao.getByUserId(userId);
  }
  update(id, data) {
    return this.dao.updateById(id, data);
  }
  addOrUpdateProduct(cartId, productId, qty) {
    return this.dao.addOrUpdateProduct(cartId, productId, qty);
  }
  removeProduct(cartId, productId) {
    return this.dao.removeProduct(cartId, productId);
  }
  clearProducts(cartId) {
    return this.dao.clearProducts(cartId);
  }
}

export default CartRepository;
