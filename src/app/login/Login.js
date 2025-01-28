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
          // Redirect to home if session is active
          router.push("/");
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
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl animate-pulse">Checking session...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow-md space-y-4 w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-red-900 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
