import ProductDAO from "../dao/mongo/product.dao.js";

class ProductRepository {
  constructor() {
    this.dao = new ProductDAO();
  }
  create(data) {
    return this.dao.create(data);
  }
  findById(id) {
    return this.dao.getById(id);
  }
  findAll(filter, options) {
    return this.dao.getAll(filter, options);
  }
  update(id, data) {
    return this.dao.updateById(id, data);
  }
  delete(id) {
    return this.dao.deleteById(id);
  }
  decreaseStock(id, qty) {
    return this.dao.decreaseStock(id, qty);
  }
  checkCode(code) {
    return this.dao.checkCode(code)
  }
}

export default ProductRepository;
