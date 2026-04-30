import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosClient.post("api/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-sm border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 border border-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg cursor-pointer shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors mt-6"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors cursor-pointer"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
