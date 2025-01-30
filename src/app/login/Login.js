"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for session check
  const router = useRouter();

  // Check if the user is already signed in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/check_session", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const userData = await res.json();
          localStorage.setItem("username", userData.username);
          localStorage.setItem("role", userData.role);

          // Redirect based on role
          if (userData.role === "admin") {
            router.push("/adminhomepage");
          } else {
            router.push("/homepage");
          }
        }
      } catch (error) {
        console.log("No active session");
      } finally {
        setLoading(false); // End loading state
      }
    };

    checkSession();
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies for JWT
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        // Redirect based on role
        if (data.role === "admin") {
          router.push("/adminhomepage");
        } else {
          router.push("/homepage");
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#800020] text-white">
        <h1 className="text-2xl animate-pulse">Checking session...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#800020] p-6 text-white">
      <div className="bg-red-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-center text-red-300">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-200">Username</label>
            <input
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-[#800020] hover:bg-red-700 text-white font-bold rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
