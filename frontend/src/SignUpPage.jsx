import { useState } from "react";
import { Link } from "react-router-dom";

const APP_NAME = "ResiSure";

const labelClass = "text-sm font-medium text-[#1E293B]";

const inputClass =
  "mt-1 h-[45px] w-full rounded-2xl border border-[#E2E8F0] bg-white px-3 text-sm text-[#1E293B] placeholder-[#94A3B8] outline-none transition-colors duration-200 focus:border-[#087CFF] focus:ring-2 focus:ring-[#DBEAFE]";

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
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-8">

      <div className="w-full max-w-102.5 rounded-3xl border border-[#F1F5F9] bg-white p-6 shadow-sm sm:p-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-[#020617]"
        >
          <span className="text-[#087CFF]">R.</span> {APP_NAME}
        </Link>

        {/* Heading */}
        <h1 className="mt-6 text-[28px] font-bold leading-tight text-[#0F172A]">
          Create your account
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#64748B]">
          Sign up to browse verified student accommodation.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Full Name */}
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

          {/* Email */}
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

            <p className="mt-1.5 text-xs text-[#94A3B8]">
              We use your email only to log you in.
            </p>
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
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

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-2xl bg-[#087CFF] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#006BE6]"
          >
            Create account
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-[#64748B]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#087CFF] transition-colors duration-200 hover:text-[#006BE6]"
          >
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}