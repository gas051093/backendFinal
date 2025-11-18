import TicketService from "../services/ticket.service.js";

const purchaseService = new TicketService();

class PurchaseController {
  static checkout = async (req, res) => {
    const { cid } = req.params;
    const user = req.user;
    try {
      const result = await purchaseService.checkoutCart(cid, user.email);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default PurchaseController;
