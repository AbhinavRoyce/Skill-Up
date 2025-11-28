import React, { useState } from "react";
import { api } from "../api.js";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data;
      onLogin(user, token);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6"
      >
        <h2 className="text-lg font-semibold mb-4 text-center">Log in to SkillUp</h2>
        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
        <label className="block mb-3 text-xs font-medium text-gray-600">
          Email
          <input
            name="email"
            type="email"
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="block mb-4 text-xs font-medium text-gray-600">
          Password
          <input
            name="password"
            type="password"
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
