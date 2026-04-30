const db = require("../config/db");

class TaskRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM tasks");
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0];
  }

  async findByProjectId(projectId) {
    const [rows] = await db.query("SELECT * FROM tasks WHERE project_id = ?", [
      projectId,
    ]);
    return rows;
  }

  async create(taskData) {
    const { title, description, project_id, assigned_to, due_date } = taskData;
    const [result] = await db.query(
      "INSERT INTO tasks (title, description, project_id, assigned_to, due_date) VALUES (?, ?, ?, ?, ?)",
      [title, description, project_id, assigned_to, due_date],
    );
    return result.insertId;
  }

  async updateStatus(id, status) {
    const [result] = await db.query(
      "UPDATE tasks SET status = ? WHERE id = ?",
      [status, id],
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

module.exports = new TaskRepository();
