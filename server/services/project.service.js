const projectRepo = require("../repositories/project.repo");
const Project = require("../models/Project");

class ProjectService {
  async getAllProjects() {
    return await projectRepo.findAll();
  }

  async getProjectById(id) {
    const project = await projectRepo.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }

  async createProject(data) {
    if (!data.name || !data.owner_id) {
      throw new Error("Name and owner_id are required");
    }

    const insertId = await projectRepo.create(data);
    return { id: insertId, ...data };
  }

  async deleteProject(id) {
    const affectedRows = await projectRepo.delete(id);
    if (affectedRows === 0) {
      throw new Error("Project not found or already deleted");
    }
    return { message: "Project deleted successfully" };
  }
}

module.exports = new ProjectService();
