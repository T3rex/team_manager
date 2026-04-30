import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import { Trash } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosClient.get("/projects");
        setProjects(res.data);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDeleteProject = async (e, projectId) => {
    e.preventDefault();
    if (!projectId) return;

    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await axiosClient.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((p) => p.id !== parseInt(projectId)));
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Team Manager</h1>
          <p className="text-sm text-slate-500">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              user?.role === "Admin"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {user?.role}
          </span>
          <button
            onClick={logout}
            className="text-slate-500 hover:text-red-600 transition-colors font-medium text-sm cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Projects</h2>

          {/* Only Admins see the Create button */}
          {user?.role === "Admin" && (
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              + New Project
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-slate-500 py-10">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl shadow-sm border border-slate-200 text-slate-500">
            No projects found.{" "}
            {user?.role === "Admin"
              ? "Create one to get started!"
              : "Ask an admin to assign you to a project."}
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link to={`/project/${project.id}`} key={project.id}>
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex justify-between">
                    <div className="flex justify-between items-start mb-4 flex-col">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-400 py-2">
                        created on:{" "}
                        {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {user?.role === "Admin" && (
                      <button
                        className="mb-auto cursor-pointer"
                        onClick={(e) => handleDeleteProject(e, project.id)}
                      >
                        <Trash size={20} color="red" />
                      </button>
                    )}
                  </div>

                  <p className="text-slate-600 text-sm line-clamp-2 mb-6">
                    {project.description || "No description provided."}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-500">
                      View Tasks →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      {isModalOpen && (
        <CreateProjectModal
          setIsModalOpen={setIsModalOpen}
          setProjects={setProjects}
          user={user}
        />
      )}
    </div>
  );
};

export default Dashboard;
