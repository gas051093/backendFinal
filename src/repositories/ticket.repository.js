import TicketDAO from "../dao/mongo/ticket.dao.js";

class TicketRepository {
  constructor() {
    this.dao = new TicketDAO();
  }
  create(data) {
    return this.dao.create(data);
  }
  findByCode(code) {
    return this.dao.getByCode(code);
  }
}

export default TicketRepository;
