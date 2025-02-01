"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        // 🛠 FIXED: Redirecting based on "user" instead of "member"
        if (data.role === "admin") {
          router.replace("/adminhomepage");
        } else if (data.role === "user") { // <-- FIXED this check!
          router.replace("/memberhomepage");
        } else {
          setError("Invalid role detected.");
        }
      } else {
        setError(data.message || "Invalid credentials!");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#800020] p-6 text-white">
      <div className="bg-red-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-300 bg-red-800 p-2 rounded mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-gray-200">Username</label>
            <input
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-2 font-bold rounded-lg transition duration-200 ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#800020] hover:bg-red-700"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
