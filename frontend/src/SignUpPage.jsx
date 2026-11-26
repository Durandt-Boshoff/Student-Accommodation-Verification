import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth";

const APP_NAME = "ResiSure";

const labelClass = "text-sm font-medium text-[#1E293B]";

const inputClass =
  "mt-1 h-[45px] w-full rounded-2xl border border-[#E2E8F0] bg-white px-3 text-sm text-[#1E293B] placeholder-[#94A3B8] outline-none transition-colors duration-200 focus:border-[#087CFF] focus:ring-2 focus:ring-[#DBEAFE]";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
    setSuccess("");

    const fullName = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("The two passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          full_name: fullName,
          email,
          password: form.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to create your account."
        );
      }

      setSuccess("Your student account has been created successfully!");

      setForm({
        name: "",
        email: "",
        password: "",
        confirm: "",
      });

    } catch (error) {
      console.error("Signup error:", error);

      setError(
        error instanceof TypeError
          ? "Unable to connect to the server. Please try again."
          : error.message || "Something went wrong. Please try again."
      );

    } finally {
      setIsSubmitting(false);
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

        {/* SIGNUP FORM */}
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
              placeholder="Enter your full name"
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
              placeholder="you@email.com"
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

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={`${inputClass} pr-20`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#087CFF] hover:text-[#006BE6]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="mt-1 text-xs text-[#94A3B8]">
              Use at least 8 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm" className={labelClass}>
              Confirm password
            </label>

            <div className="relative">
              <input
                id="confirm"
                name="confirm"
                type={showConfirmPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`${inputClass} pr-20`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#087CFF] hover:text-[#006BE6]"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
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

          {/* Success */}
          {success && (
            <div
              role="status"
              className="rounded-2xl bg-green-50 px-3 py-3 text-sm text-green-700"
            >
              <p>{success}</p>

              <button
                type="button"
                onClick={() => navigate("/login", { replace: true })}
                className="mt-2 font-semibold underline hover:text-green-900"
              >
                Continue to login
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-[#087CFF] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#006BE6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
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
