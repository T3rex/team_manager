const db = require("../config/db");

class ProjectRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM projects");
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM projects WHERE id = ?", [id]);
    return rows[0];
  }

  async create(projectData) {
    const { name, description, owner_id } = projectData;
    const [result] = await db.query(
      "INSERT INTO projects (name, description, owner_id) VALUES (?, ?, ?)",
      [name, description, owner_id],
    );
    return result.insertId;
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM projects WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

module.exports = new ProjectRepository();
