
"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  // Form Submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        // Redirect based on user role
        if (data.role === "admin") {
          router.replace("/adminhomepage");
        } else if (data.role === "user") {
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
      setSubmitting(false);
    }
  };

  // Loading Animation
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#800020]">
        <div className="flex space-x-2">
          <div className="w-5 h-5 bg-red-300 rounded-full animate-bounce"></div>
          <div className="w-5 h-5 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-5 h-5 bg-red-700 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#800020] p-6 text-white">
      <div className="bg-red-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-300 bg-red-800 p-2 rounded mb-4">{error}</p>
        )}

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Username Field */}
              <div>
                <label className="block text-gray-200">Username</label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                />
                <ErrorMessage name="username" component="p" className="text-red-300 text-sm mt-1" />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-200">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                />
                <ErrorMessage name="password" component="p" className="text-red-300 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full p-2 font-bold rounded-lg transition duration-200 ${
                  isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-[#800020] hover:bg-red-700"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
