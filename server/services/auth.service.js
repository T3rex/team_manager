const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/user.repo");

class AuthService {
  async register(data) {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Name, email, and password are required");
    }
    //Duplicate check
    const existingUser = await userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email is already in use");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const newUserId = await userRepo.create(data);
    return {
      id: newUserId,
      name: data.name,
      email: data.email,
      role: data.role || "Member",
    };
  }

  async login(email, password) {
    const user = await userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    return {
      token,
      user: { id: user.id, name: user.name, role: user.role },
    };
  }
}

module.exports = new AuthService();
