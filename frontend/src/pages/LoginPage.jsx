
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon({ visible }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {!visible && <path d="m4 4 16 16" />}
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // HANDLE LOGIN
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: trimmedEmail,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed. Please check your details."
        );
      }

      // Authentication is handled using an HTTP-only cookie.
      // Never store the JWT in localStorage or sessionStorage.

      const redirectTo =
        data.user?.role === "admin"
          ? "/admin/dashboard"
          : data.user?.role === "student"
            ? "/student/dashboard"
            : null;

      if (!redirectTo) {
        throw new Error(
          "Your account role could not be verified. Please contact support."
        );
      }

      navigate(redirectTo, { replace: true });

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error instanceof TypeError
          ? "Unable to connect to the server. Please check your connection and try again."
          : error.message || "Something went wrong. Please try again."
      );

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white px-5 py-10 font-sans">

      <section className="mx-auto flex w-full max-w-[410px] flex-col items-center justify-center">

        {/* RESISURE BRAND */}
        <Link
          to="/"
          className="mb-10 flex w-full items-center justify-center gap-2"
          aria-label="ResiSure home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg">
            <span className="text-4xl font-extrabold tracking-tighter text-slate-950">
              R<span className="text-[#087CFF]">.</span>
            </span>
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Resi<span className="text-[#087CFF]">Sure</span>
          </span>
        </Link>

        {/* WELCOME HEADING */}
        <div className="mb-9 w-full text-center">
          <h1 className="mb-2 text-[28px] font-bold tracking-tight text-slate-900">
            Welcome back
          </h1>

          <p className="text-base text-slate-500">
            Log in to your account to continue
          </p>
        </div>

        {/* LOGIN FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col space-y-5"
        >

          {/* EMAIL FIELD */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-900"
            >
              Email
            </label>

            <div className="flex h-[45px] w-full items-center gap-3 rounded-2xl border border-slate-200 px-3 transition-all duration-200 hover:border-slate-300 focus-within:border-[#087CFF] focus-within:ring-4 focus-within:ring-blue-100">
              <span className="text-slate-500">
                <MailIcon />
              </span>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="you@email.com"
                autoComplete="email"
                required
                disabled={isLoading}
                aria-invalid={Boolean(error)}
                className="h-full w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div className="w-full">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-900"
            >
              Password
            </label>

            <div className="flex h-[45px] w-full items-center gap-3 rounded-2xl border border-slate-200 px-3 transition-all duration-200 hover:border-slate-300 focus-within:border-[#087CFF] focus-within:ring-4 focus-within:ring-blue-100">
              <span className="text-slate-500">
                <LockIcon />
              </span>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="h-full w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
              />

              {/* SHOW / HIDE PASSWORD */}
              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                aria-pressed={showPassword}
                disabled={isLoading}
                className="rounded-md text-slate-500 transition-colors duration-200 hover:text-[#087CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:opacity-50"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p
              id="login-error"
              role="alert"
              aria-live="assertive"
              className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-[48px] w-full items-center justify-center rounded-2xl bg-[#087CFF] text-sm font-semibold text-white shadow-md shadow-blue-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#006BE6] hover:shadow-lg hover:shadow-blue-300/50 active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* SIGNUP LINK */}
        <p className="mt-7 w-full text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-[#087CFF] transition-colors duration-200 hover:text-[#006BE6] hover:underline"
          >
            Sign up
          </Link>
        </p>

      </section>
    </main>
  );
}
