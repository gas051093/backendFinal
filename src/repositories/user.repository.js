import UserDAO from "../dao/mongo/user.dao.js";

class UserRepository {
  constructor() {
    this.dao = new UserDAO();
  }
  create(data) {
    return this.dao.create(data);
  }
  findByEmail(email) {
    return this.dao.getByEmail(email);
  }
  findById(id) {
    return this.dao.getById(id);
  }
  update(id, data) {
    return this.dao.updateById(id, data);
  }
  addPasswordToHistory(id, hash) {
    return this.dao.pushPasswordHistory(id, hash);
  }
}

export default UserRepository;
