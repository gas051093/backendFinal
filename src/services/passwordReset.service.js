import PasswordResetRepository from "../repositories/passwordReset.repository.js";
import crypto from "crypto";
import { hashToken } from "../utils/index.js";

class PasswordResetService {
  constructor() {
    this.repo = new PasswordResetRepository();
  }

  async createTokenForUser(userId) {
    const tokenPlain = crypto.randomBytes(32).toString("hex");
    const tokenHash = hashToken(tokenPlain);
    const expiresAt = new Date(
      Date.now() +
        Number(process.env.PASSWORD_RESET_EXPIRES_MIN || 60) * 60 * 1000
    );

    await this.repo.invalidateAll(userId);
    const record = await this.repo.create({
      userId,
      tokenHash,
      expiresAt,
      used: false,
    });
    return { tokenPlain, record };
  }

  async validateToken(userId, tokenPlain) {
    const tokenHash = hashToken(tokenPlain);
    return this.repo.findValid(userId, tokenHash);
  }

  async markUsed(id) {
    return this.repo.markUsed(id);
  }
}

export default PasswordResetService;
