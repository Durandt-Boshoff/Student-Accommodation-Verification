import { Link } from "react-router-dom";

// Change this to your group's app name (also in SignUpPage.jsx)
const APP_NAME = "Student Accommodation Verification";

const badges = [
  {
    name: "Platform Verified",
    text: "Our admin checked the provider, the address and the listing details.",
    style: "bg-green-900 text-green-300",
  },
  {
    name: "Institution Accredited",
    text: "The university or college confirmed the accreditation.",
    style: "bg-violet-900 text-violet-300",
  },
  {
    name: "Unverified",
    text: "Not checked yet. Be careful before you pay anything.",
    style: "bg-amber-900 text-amber-300",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top bar */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <span className="text-sm font-bold leading-tight text-blue-400 sm:text-lg">{APP_NAME}</span>
        <nav className="flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-400"
          >
            Sign up
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-5xl px-4">
        <section className="py-10 sm:py-16">
          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-5xl">
            Find student accommodation in Braamfontein you can trust
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
            Browse listings in one place and see which ones have been checked,
            before you pay a deposit or share your personal details.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/signup"
              className="rounded-lg bg-blue-500 px-5 py-3 text-center font-medium text-white hover:bg-blue-400"
            >
              Create a free account
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-slate-700 px-5 py-3 text-center font-medium text-slate-100 hover:bg-slate-800"
            >
              I already have an account
            </Link>
          </div>
        </section>

        {/* What the badges mean */}
        <section className="pb-12">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            What the verification labels mean
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {badges.map((b) => (
              <div
                key={b.name}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4"
              >
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${b.style}`}
                >
                  {b.name}
                </span>
                <p className="mt-3 text-sm text-slate-400">{b.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Verification improves transparency but is not a guarantee of
            safety or future compliance.
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        {APP_NAME} · Built for students in Braamfontein, Johannesburg
      </footer>
    </div>
  );
}

