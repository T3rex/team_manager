const projectService = require("../services/project.service");

class ProjectController {
  async getAll(req, res) {
    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const project = await projectService.getProjectById(req.params.id);
      res.status(200).json(project);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      console.log("Creating project with data:", req.body);
      const newProject = await projectService.createProject(req.body);
      res.status(201).json(newProject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await projectService.deleteProject(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new ProjectController();
