const db = require("../config/db");

class UserRepository {
  async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  async create(userData) {
    const { name, email, password, role } = userData;
    const userRole = role || "Member";

    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, userRole],
    );
    return result.insertId;
  }

  async findAll() {
    const [rows] = await db.query("SELECT id, name, email, role FROM users");
    return rows;
  }
}

module.exports = new UserRepository();
