import mongoose from "mongoose";
import ProductService from "../services/product.service.js";

const productService = new ProductService();

class ProductController {
  static create = async (req, res) => {
    try {
      const { code } = req.body;
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
      res.status(500).json(err.message);
    }
  };

  static list = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await productService.getProducts(
        {},
        { page, limit, lean: true }
      );
      res.json(result);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };

  static getOne = async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.pid))
        return res.status(400).json({ message: "ID Invalido" });
      const product = await productService.getProductById(req.params.pid);
      if (!product)
        return res.status(404).json({ message: "No se encuentra el producto" });
      res.json(product);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };

  static update = async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.pid))
        return res.status(400).json({ message: "ID Invalido" });
      const updated = await productService.updateProduct(
        req.params.pid,
        req.body
      );
      res.json(updated);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };

  static delete = async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.pid))
        return res.status(400).json({ message: "ID Invalido" });
      await productService.deleteProduct(req.params.pid);
      res.json({ message: "deleted" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };
}

export default ProductController;
