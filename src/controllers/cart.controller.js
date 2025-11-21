import mongoose from "mongoose";
import CartService from "../services/cart.service.js";

const cartService = new CartService();

class CartController {
  static getCart = async (req, res) => {
    try {
      const cart = await cartService.getCartByUserId(req.user._id);
      if (!cart) return res.status(404).json({ message: "Cart no encontrado" });
      res.json(cart);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };
  static allCarts = async (req, res) => {
    try {
      const carts = await cartService.all();
      res.json(carts);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };
  static addProduct = async (req, res) => {
    try {
      if (
        !mongoose.isValidObjectId(req.params.pid) ||
        !mongoose.isValidObjectId(req.params.cid)
      )
        return res.status(400).json({ message: "IDs Invalidos" });
      const { cid } = req.params;
      const { pid } = req.params;
      const { qty = 1 } = req.body;
      const updated = await cartService.addProduct(cid, pid, Number(qty));
      res.json(updated);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };

  static removeProduct = async (req, res) => {
    try {
      if (
        !mongoose.isValidObjectId(req.params.pid) ||
        !mongoose.isValidObjectId(req.params.cid)
      )
        return res.status(400).json({ message: "IDs Invalidos" });
      const { cid, pid } = req.params;
      const updated = await cartService.removeProduct(cid, pid);
      res.json(updated);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error en el servidor", err: err.message });
    }
  };
}

export default CartController;
