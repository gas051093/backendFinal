import PasswordResetModel from "../models/passwordReset.model.js";

class PasswordResetDAO {
  create(data) {
    return PasswordResetModel.create(data);
  }
  findValid(userId, tokenHash) {
    return PasswordResetModel.findOne({
      userId,
      tokenHash,
      used: false,
      expiresAt: { $gt: new Date() },
    }).exec();
  }
  markUsed(id) {
    return PasswordResetModel.findByIdAndUpdate(
      id,
      { used: true },
      { new: true }
    ).exec();
  }
  invalidateAll(userId) {
    return PasswordResetModel.updateMany(
      { userId, used: false },
      { used: true }
    ).exec();
  }
}

export default PasswordResetDAO;
