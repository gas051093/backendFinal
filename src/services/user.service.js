import UserRepository from "../repositories/user.repository.js";
import { sendEmail } from "../utils/mail.js";
import jwt from "jsonwebtoken";
import { resetPasswordTemplate } from "../templates/email/resetPassword.template.js";

class UserService {
  constructor() {
    this.repo = new UserRepository();
  }

  createUser(data) {
    return this.repo.create(data);
  }
  getUserByEmail(email) {
    return this.repo.findByEmail(email);
  }
  getUserById(id) {
    return this.repo.findById(id);
  }
  updateUser(id, data) {
    return this.repo.update(id, data);
  }
  addToPasswordHistory(id, oldHash) {
    return this.repo.addPasswordToHistory(id, oldHash);
  }

  async sendRecoveryEmail(email, tokenPlain, userId) {
    const link = `${process.env.APP_URL}/api/users/reset?userId=${userId}&token=${tokenPlain}`;
    const html = resetPasswordTemplate(link);
    await sendEmail({ to: email, subject: "Password reset", html });
  }

  verifyJwt(token, secret = process.env.JWT_SECRET) {
    return jwt.verify(token, secret);
  }
}

export default UserService;
