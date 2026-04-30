const taskRepo = require("../repositories/task.repo");

class TaskService {
  async getAllTasks() {
    return await taskRepo.findAll();
  }

  async getTaskById(id) {
    const task = await taskRepo.findById(id);
    if (!task) throw new Error("Task not found");
    return task;
  }

  async getTasksByProjectId(projectId) {
    const tasks = await taskRepo.findByProjectId(projectId);
    return tasks;
  }

  async createTask(data) {
    if (!data.title || !data.project_id) {
      throw new Error("Title and project_id are required");
    }
    const insertId = await taskRepo.create(data);
    return { id: insertId, ...data, status: "Todo" };
  }

  async updateTaskStatus(id, status) {
    const validStatuses = ["Todo", "In-Progress", "Done"];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status. Must be Todo, In-Progress, or Done");
    }

    const affectedRows = await taskRepo.updateStatus(id, status);
    if (affectedRows === 0) throw new Error("Task not found");

    return { message: "Task status updated successfully", id, status };
  }

  async deleteTask(id) {
    const affectedRows = await taskRepo.delete(id);
    if (affectedRows === 0)
      throw new Error("Task not found or already deleted");
    return { message: "Task deleted successfully" };
  }
}

module.exports = new TaskService();
