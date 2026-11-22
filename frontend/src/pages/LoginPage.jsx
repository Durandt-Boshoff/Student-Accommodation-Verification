
import { useState } from "react";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.7"
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
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {!visible && <path d="m4 4 16 16" />}
    </svg>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend authentication will be connected in Phase 2.
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white px-5 py-10 font-sans">

      {/* Main centered login container */}
      <section className="mx-auto flex w-full max-w-[410px] flex-col items-center justify-center">

        {/* ResiSure Brand */}
        <div className="mb-10 flex w-full items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg">
            <span className="text-4xl font-extrabold tracking-tighter text-slate-950">
              R<span className="text-[#087CFF]">.</span>
            </span>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Resi<span className="text-[#087CFF]">Sure</span>
          </h1>
        </div>

        {/* Welcome Heading */}
        <div className="mb-9 w-full text-center">
          <h2 className="mb-2 text-[28px] font-bold tracking-tight text-slate-900">
            Welcome back
          </h2>

          <p className="text-base text-slate-500">
            Log in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col space-y-5"
        >

          {/* Email Field */}
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
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
                required
                className="h-full w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password Field */}
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
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="h-full w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              {/* Show / Hide Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-slate-500 transition-colors duration-200 hover:text-[#087CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 rounded-md"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex w-full justify-end -mt-1">
            <button
              type="button"
              className="text-sm font-medium text-[#087CFF] transition-colors duration-200 hover:text-[#006BE6] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="flex h-[48px] w-full items-center justify-center rounded-2xl bg-[#087CFF] text-sm font-semibold text-white shadow-md shadow-blue-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#006BE6] hover:shadow-lg hover:shadow-blue-300/50 active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
          >
            Log In
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-7 w-full text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-[#087CFF] transition-colors duration-200 hover:text-[#006BE6] hover:underline"
          >
            Sign up
          </a>
        </p>

      </section>
    </main>
  );
}
