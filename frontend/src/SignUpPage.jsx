
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth";

const labelClass = "text-sm font-medium text-slate-300";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-base text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40";

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
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6">

        {/* BRAND */}
        <Link to="/" className="text-xl font-bold text-white">
          Resi<span className="text-blue-400">Sure</span>
        </Link>

        <h1 className="mt-5 text-2xl font-bold text-white">
          Create your account
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Sign up to browse student accommodation.
        </p>

        {/* SIGNUP FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* FULL NAME */}
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

          {/* EMAIL */}
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

            <p className="mt-1 text-xs text-slate-500">
              We use your email to identify your account.
            </p>
          </div>

          {/* PASSWORD */}
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-400 hover:text-blue-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Use at least 8 characters.
            </p>
          </div>

          {/* CONFIRM PASSWORD */}
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-400 hover:text-blue-300"
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

          {/* ERROR */}
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-950 px-3 py-2 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          {/* SUCCESS */}
          {success && (
            <div
              role="status"
              className="rounded-lg bg-green-950 px-3 py-3 text-sm text-green-300"
            >
              <p>{success}</p>

              <button
                type="button"
                onClick={() => navigate("/login", { replace: true })}
                className="mt-2 font-semibold underline hover:text-white"
              >
                Continue to login
              </button>
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login", { replace: true })}
            className="font-medium text-blue-400 hover:underline"
          >
            Log in
          </button>
        </p>

      </div>
    </div>
  );
}
