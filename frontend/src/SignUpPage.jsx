import { useState } from "react";
import { Link } from "react-router-dom";

// Change this to your group's app name (also in LandingPage.jsx)
const APP_NAME = "Student Accommodation Verification";

const labelClass = "text-sm font-medium text-slate-300";
const inputClass =
  "mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-base text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Phase 1: no backend yet. Phase 2 will send this to the Express API.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 8) {
      setError("Your password must be at least 8 characters.");
    } else if (form.password !== form.confirm) {
      setError("The two passwords do not match.");
    } else {
      setError("");
      console.log("Sign up (static for now):", form.name, form.email);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <Link to="/" className="text-sm font-bold text-blue-400">
          {APP_NAME}
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-white">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Sign up to browse verified student accommodation.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-slate-500">
              We use your email only to log you in.
            </p>
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="confirm" className={labelClass}>
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              required
              autoComplete="new-password"
              value={form.confirm}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-950 px-3 py-2 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-400"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
