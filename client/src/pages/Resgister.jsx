import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axiosClient.post("api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-sm border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Join the team and start managing tasks
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 border border-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              value={formData.name}
              className="appearance-none block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              value={formData.email}
              className="appearance-none block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
              className="appearance-none block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Account Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              value={formData.role}
              className="block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
            >
              <option value="Member">Team Member</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors mt-6"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
