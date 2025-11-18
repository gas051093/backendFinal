import CartRepository from "../repositories/cart.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import TicketRepository from "../repositories/ticket.repository.js";
import { v4 as uuidv4 } from "uuid";

class PurchaseService {
  constructor() {
    this.cartRepo = new CartRepository();
    this.productRepo = new ProductRepository();
    this.ticketRepo = new TicketRepository();
  }

  async checkoutCart(cartId, purchaserEmail) {
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) throw new Error("Cart not found");

    const toBuy = [];
    const notBought = [];

    for (const item of cart.products) {
      const prod = await this.productRepo.findById(
        item.product._id || item.product
      );
      if (!prod) {
        notBought.push(item);
        continue;
      }
      if (prod.stock >= item.quantity) {
        toBuy.push({ product: prod, qty: item.quantity });
      } else {
        notBought.push(item);
      }
    }

    if (toBuy.length === 0) {
      return {
        status: "failed",
        message: "No hay stock disponible",
        notBought,
      };
    }

    // calculate amount and decrease stock
    let amount = 0;
    for (const buy of toBuy) {
      amount += buy.qty * buy.product.price;
    }

    const ticketData = {
      code: uuidv4(),
      amount,
      purchaser: purchaserEmail,
      items: toBuy.map((b) => ({
        productId: b.product._id,
        title: b.product.title,
        qty: b.qty,
        unitPrice: b.product.price,
      })),
      status: notBought.length === 0 ? "complete" : "partial",
    };

    // decrease stock
    for (const buy of toBuy) {
      await this.productRepo.decreaseStock(buy.product._id, buy.qty);
    }

    // remove purchased items from cart
    const remainingProducts = cart.products.filter(
      (p) =>
        !toBuy.some(
          (b) =>
            b.product._id.toString() ===
            (p.product._id ? p.product._id.toString() : p.product.toString())
        )
    );
    await this.cartRepo.update(cartId, { products: remainingProducts });

    const ticket = await this.ticketRepo.create(ticketData);

    return { status: ticketData.status, ticket, notBought };
  }
}

export default PurchaseService;
