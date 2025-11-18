import ticketModel from "../models/ticket.model.js";

class TicketDAO {
  create(data) {
    return ticketModel.create(data);
  }
  getByCode(code) {
    return ticketModel.findOne({ code }).exec();
  }
}

export default TicketDAO;
