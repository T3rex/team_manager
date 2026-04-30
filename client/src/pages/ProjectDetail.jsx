import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { Trash, User } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [teamUsers, setTeamUsers] = useState([]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, tasksRes, usersRes] = await Promise.all([
          axiosClient.get(`/projects/${id}`),
          axiosClient.get(`/tasks/project/${id}`),
          axiosClient.get(`/users`),
        ]);

        setProject(projectRes.data);
        const projectTasks = tasksRes.data.filter(
          (t) => t.project_id === parseInt(id),
        );
        setTasks(projectTasks);
        setTeamUsers(usersRes.data);
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Create Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const res = await axiosClient.post("/tasks", {
        title: newTaskTitle,
        project_id: parseInt(id),
        assigned_to: assignedTo ? parseInt(assignedTo) : null,
      });
      setTasks([...tasks, res.data]);
      setNewTaskTitle("");
      setAssignedTo("");
    } catch (err) {
      alert("Failed to add task");
    }
  };

  // Update Task Status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axiosClient.patch(`/tasks/${taskId}/status`, { status: newStatus });
      setTasks(
        tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  //Delete Task Logic
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axiosClient.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const getAssignedUserName = (userId) => {
    if (!userId) return "Unassigned";
    const assignedUser = teamUsers.find((u) => u.id === userId);
    return assignedUser ? assignedUser.name : "Unknown";
  };

  if (loading)
    return (
      <div className="text-center p-10 text-slate-500">Loading project...</div>
    );
  if (!project)
    return (
      <div className="text-center p-10 text-red-500">Project not found!</div>
    );

  const renderTaskColumn = (status, title, bgColor) => {
    const columnTasks = tasks.filter((t) => t.status === status);

    return (
      <div
        className={`rounded-xl p-4 min-h-[400px] ${bgColor} border border-slate-200`}
      >
        <h3 className="font-bold text-slate-700 mb-4 flex justify-between items-center">
          {title}
          <span className="bg-white px-2.5 py-0.5 rounded-full text-xs font-bold text-slate-500 shadow-sm border border-slate-200">
            {columnTasks.length}
          </span>
        </h3>

        <div className="space-y-3">
          {columnTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 group relative flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="font-medium text-slate-800 pr-6">{task.title}</p>

                {/* Trash Icon   */}
                {user?.role === "Admin" && (
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4"
                    title="Delete Task"
                  >
                    <Trash size={16} />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                <User size={14} />
                <span>{getAssignedUserName(task.assigned_to)}</span>
              </div>

              <div className="flex gap-2 mt-auto pt-3 border-t border-slate-50">
                {status !== "Todo" && (
                  <button
                    onClick={() =>
                      updateTaskStatus(
                        task.id,
                        status === "Done" ? "In-Progress" : "Todo",
                      )
                    }
                    className="text-xs font-medium text-slate-500 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-3 py-1.5 rounded transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                )}
                {status !== "Done" && (
                  <button
                    onClick={() =>
                      updateTaskStatus(
                        task.id,
                        status === "Todo" ? "In-Progress" : "Done",
                      )
                    }
                    className="text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded ml-auto transition-colors shadow-sm cursor-pointer"
                  >
                    Move →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium mb-4 inline-flex items-center gap-1"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            {project.name}
          </h1>
          <p className="text-slate-600 mt-2 max-w-2xl">{project.description}</p>
        </div>

        {user?.role === "Admin" && (
          <form onSubmit={handleAddTask} className="mb-8 flex gap-3 max-w-2xl">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm text-sm"
            />
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-48 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm text-sm bg-white"
            >
              <option value="">Unassigned</option>
              {teamUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors text-sm cursor-pointer"
            >
              Add Task
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderTaskColumn("Todo", "To Do", "bg-slate-100")}
          {renderTaskColumn("In-Progress", "In Progress", "bg-indigo-50/50")}
          {renderTaskColumn("Done", "Completed", "bg-emerald-50/50")}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
