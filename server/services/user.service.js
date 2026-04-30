const userRepo = require("../repositories/user.repo");

class UserService {
  async getAllUsers() {
    return await userRepo.findAll();
  }
}

module.exports = new UserService();
