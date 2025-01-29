"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    gender: "male",
    role: "user",
    image: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/check_session", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          router.push("/homepage"); // Redirect if session is active
        }
      } catch (error) {
        console.log("No active session");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (checked ? "admin" : "user") : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are sent
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        // Wait a bit to ensure session is recognized
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check session after signup
        const sessionRes = await fetch("/api/check_session", {
          method: "GET",
          credentials: "include",
        });

        if (sessionRes.ok) {
          router.push("/homepage"); // Redirect to homepage
        } else {
          setError("Sign-up successful, but session not recognized.");
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
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl animate-pulse">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow-md space-y-4 w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold">Register a Member</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="role"
            checked={form.role === "admin"}
            onChange={handleChange}
          />
          <span>Register as Admin</span>
        </label>
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        {form.image && (
          <div className="w-full flex justify-center mt-4">
            <img
              src={form.image}
              alt="Preview"
              className="h-32 w-32 object-cover rounded"
            />
          </div>
        )}
        <button className="w-full bg-red-900 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
