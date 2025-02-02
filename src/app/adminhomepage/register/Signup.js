
"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Signup() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    gender: "male",
    role: "user",
    image: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
    gender: Yup.string().required("Required"),
    image: Yup.string().url("Must be a valid URL").required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        resetForm();
        setSuccessMessage("User registered successfully!");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-burgundy">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="bg-red-900 p-6 rounded shadow-md space-y-4 w-80 border-2 border-red-900">
            <h2 className="text-xl font-bold text-white">Register a Member</h2>

            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {error && <p className="text-red-500">{error}</p>}

            <Field name="name" placeholder="Name" className="w-full border p-2 rounded bg-gray-800 text-white" />
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />

            <Field name="username" placeholder="Username" className="w-full border p-2 rounded bg-gray-800 text-white" />
            <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />

            <Field type="email" name="email" placeholder="Email" className="w-full border p-2 rounded bg-gray-800 text-white" />
            <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />

            <Field type="password" name="password" placeholder="Password" className="w-full border p-2 rounded bg-gray-800 text-white" />
            <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />

            <Field as="select" name="gender" className="w-full border p-2 rounded bg-gray-800 text-white">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
            <ErrorMessage name="gender" component="p" className="text-red-500 text-sm" />

            <label className="flex items-center space-x-2 text-white">
              <Field type="checkbox" name="role" checked={values.role === "admin"} onChange={() => setFieldValue("role", values.role === "admin" ? "user" : "admin")} />
              <span>Register as Admin</span>
            </label>

            <Field type="url" name="image" placeholder="Image URL" className="w-full border p-2 rounded bg-gray-800 text-white" />
            <ErrorMessage name="image" component="p" className="text-red-500 text-sm" />

            {values.image && (
              <div className="w-full flex justify-center mt-4">
                <img src={values.image} alt="Preview" className="h-32 w-32 object-cover rounded border-2 border-red-900" />
              </div>
            )}

            <button className="w-full bg-red-900 text-white p-2 rounded" type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
