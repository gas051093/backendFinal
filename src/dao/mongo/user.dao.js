import userModel from "../models/user.model.js";

class UserDAO {
  create(data) {
    return userModel.create(data);
  }
  getByEmail(email) {
    return userModel.findOne({ email }).exec();
  }
  getById(id) {
    return userModel.findById(id).exec();
  }
  updateById(id, data) {
    return userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  pushPasswordHistory(id, hash) {
    return userModel
      .findByIdAndUpdate(
        id,
        { $push: { passwordHistory: hash } },
        { new: true }
      )
      .exec();
  }
}

export default UserDAO;
