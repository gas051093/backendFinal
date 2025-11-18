import productsModel from "../models/product.model.js";

class ProductDAO {
  create(data) {
    return productsModel.create(data);
  }
  getById(id) {
    return productsModel.findById(id).exec();
  }
  getAll(filter = {}, options = {}) {
    return productsModel.paginate(filter, options);
  }
  updateById(id, data) {
    return productsModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  deleteById(id) {
    return productsModel.findByIdAndDelete(id).exec();
  }
  decreaseStock(id, qty) {
    return productsModel
      .findByIdAndUpdate(id, { $inc: { stock: -qty } }, { new: true })
      .exec();
  }
  checkCode(code) { 
    return productsModel.exists({code})
  }
}

export default ProductDAO;
