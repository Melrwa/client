"use client";
import { useState } from "react";

export default function Signup() {
  // Form state
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    gender: "male",
    role: "user", // Default to 'user'
    image: "",
  });

  // Success and error messages
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (checked ? "admin" : "user") : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Clear form fields after successful signup
        setForm({
          name: "",
          username: "",
          email: "",
          password: "",
          gender: "male",
          role: "user",
          image: "",
        });

        // ✅ Show success message (without redirecting)
        setSuccessMessage("User registered successfully!");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-burgundy">
      <form
        className="bg-white p-6 rounded shadow-md space-y-4 w-80 border-2 border-red-900"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold text-red-900">Register a Member</h2>

        {/* Display success or error messages */}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Name Input */}
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Username Input */}
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Gender Dropdown */}
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

        {/* Role Selection (Admin/User) */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="role"
            checked={form.role === "admin"}
            onChange={handleChange}
          />
          <span>Register as Admin</span>
        </label>

        {/* Image URL Input */}
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Preview Image */}
        {form.image && (
          <div className="w-full flex justify-center mt-4">
            <img
              src={form.image}
              alt="Preview"
              className="h-32 w-32 object-cover rounded border-2 border-red-900"
            />
          </div>
        )}

        {/* Submit Button */}
        <button className="w-full bg-red-900 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
