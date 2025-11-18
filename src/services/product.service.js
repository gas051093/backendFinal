import ProductRepository from "../repositories/product.repository.js";

class ProductService {
  constructor() {
    this.repo = new ProductRepository();
  }
  createProduct(data) {
    return this.repo.create(data);
  }
  getProductById(id) {
    return this.repo.findById(id);
  }
  getProducts(filter, options) {
    return this.repo.findAll(filter, options);
  }
  updateProduct(id, data) {
    return this.repo.update(id, data);
  }
  deleteProduct(id) {
    return this.repo.delete(id);
  }
  decreaseStock(id, qty) {
    return this.repo.decreaseStock(id, qty);
  }
  checkCode(code) {
    return this.repo.checkCode(code);
  }
}

export default ProductService;
