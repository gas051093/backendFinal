import CartService from "../services/cart.service.js";

const cartService = new CartService();

class CartController {
  static getCart = async (req, res) => {
    const cart = await cartService.getCartByUserId(req.user._id);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  };

  static addProduct = async (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    const { qty = 1 } = req.body;
    const updated = await cartService.addProduct(cid, pid, Number(qty));
    res.json(updated);
  };

  static removeProduct = async (req, res) => {
    const { cid, pid } = req.params;
    const updated = await cartService.removeProduct(cid, pid);
    res.json(updated);
  };
}

export default CartController;
