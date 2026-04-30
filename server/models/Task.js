class Task {
  constructor(
    id,
    title,
    description,
    status,
    due_date,
    project_id,
    assigned_to,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.due_date = due_date;
    this.project_id = project_id;
    this.assigned_to = assigned_to;
  }
}

module.exports = Task;
