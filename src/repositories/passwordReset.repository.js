import PasswordResetDAO from "../dao/mongo/passwordReset.dao.js";

class PasswordResetRepository {
  constructor() {
    this.dao = new PasswordResetDAO();
  }
  create(data) {
    return this.dao.create(data);
  }
  findValid(userId, tokenHash) {
    return this.dao.findValid(userId, tokenHash);
  }
  markUsed(id) {
    return this.dao.markUsed(id);
  }
  invalidateAll(userId) {
    return this.dao.invalidateAll(userId);
  }
}

export default PasswordResetRepository;
