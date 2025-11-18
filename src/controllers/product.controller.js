import ProductService from "../services/product.service.js";

const productService = new ProductService();

class ProductController {
  static create = async (req, res) => {
    try {
      const { code } = req.body;;;
      const body = req.body;
      const exitCode = await productService.checkCode(code);
      if (exitCode)
        return res.status(409).json({
          ok: false,
          error: {
            code: "PRODUCT_CODE_CONFLICT",
            message: "Ya existe un producto con el mismo CODE",
            details: { code },
          },
        });
      const product = await productService.createProduct(body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err.message)
    }
  };

  static list = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const result = await productService.getProducts(
      {},
      { page, limit, lean: true }
    );
    res.json(result);
  };

  static getOne = async (req, res) => {
    const product = await productService.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  };

  static update = async (req, res) => {
    const updated = await productService.updateProduct(
      req.params.pid,
      req.body
    );
    res.json(updated);
  };

  static delete = async (req, res) => {
    await productService.deleteProduct(req.params.pid);
    res.json({ message: "deleted" });
  };
}

export default ProductController;
