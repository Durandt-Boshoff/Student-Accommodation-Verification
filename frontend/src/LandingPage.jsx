import { Link } from "react-router-dom";

const APP_NAME = "ResiSure";

const badges = [
  {
    name: "Platform Verified",
    text: "Our admin checked the provider, the address and the listing details.",
    style: "bg-blue-50 text-blue-600",
  },
  {
    name: "Institution Accredited",
    text: "The university or college confirmed the accreditation.",
    style: "bg-blue-50 text-blue-600",
  },
  {
    name: "Unverified",
    text: "Not checked yet. Be careful before you pay anything.",
    style: "bg-slate-100 text-slate-600",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* Navbar */}
      <header className="h-19 border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex h-full max-w-360 items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-[#020617]"
          >
            <span className="text-[#087CFF]">R.</span> ResiSure
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-2xl px-4 py-2 text-sm font-medium text-[#1E293B] transition-colors duration-200 hover:bg-[#EFF6FF] hover:text-[#087CFF]"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="rounded-2xl bg-[#087CFF] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#006BE6]"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-330 px-4 sm:px-6 lg:px-8">

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">

            <h1 className="text-[28px] font-bold leading-tight text-[#0F172A] sm:text-[32px]">
              Find student accommodation in Braamfontein you can trust
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#64748B]">
              Browse listings in one place and see which ones have been checked,
              before you pay a deposit or share your personal details.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/signup"
                className="rounded-2xl bg-[#087CFF] px-5 py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#006BE6]"
              >
                Create a free account
              </Link>

              <Link
                to="/login"
                className="rounded-2xl border border-[#E2E8F0] bg-white px-5 py-3 text-center text-sm font-semibold text-[#1E293B] transition-colors duration-200 hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
              >
                I already have an account
              </Link>

            </div>
          </div>
        </section>

        {/* Verification Labels */}
        <section className="pb-12 sm:pb-16">

          <h2 className="text-xl font-semibold text-[#0F172A] sm:text-2xl">
            What the verification labels mean
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {badges.map((b) => (
              <div
                key={b.name}
                className="rounded-3xl border border-[#F1F5F9] bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${b.style}`}
                >
                  {b.name}
                </span>

                <p className="mt-3 text-sm leading-6 text-[#64748B]">
                  {b.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs leading-5 text-[#94A3B8]">
            Verification improves transparency but is not a guarantee of
            safety or future compliance.
          </p>

        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] py-6 text-center text-xs text-[#94A3B8]">
        {APP_NAME} · Built for students in Braamfontein, Johannesburg
      </footer>
    </div>
  );
}