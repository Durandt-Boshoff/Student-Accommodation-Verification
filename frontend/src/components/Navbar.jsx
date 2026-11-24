
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logoutUser();

      setMenuOpen(false);
      navigate("/login", { replace: true });

    } catch (error) {
      setLogoutError(
        error.message || "Unable to log out. Please try again."
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <nav className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10">

        {/* LOGO */}
        <a href="/student/dashboard" className="flex items-center gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-slate-950">
            R<span className="text-[#087CFF]">.</span>
          </span>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Resi<span className="text-[#087CFF]">Sure</span>
          </span>
        </a>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-10 md:flex">
          <a
            href="#listings"
            className="border-b-2 border-slate-900 py-2 text-sm font-semibold text-slate-900 transition-colors"
          >
            For Students
          </a>

          <a
            href="/admin/dashboard"
            className="py-2 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-[#087CFF]"
          >
            For Landlords
          </a>
        </div>

        {/* DESKTOP LOGOUT BUTTON */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="hidden rounded-full border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-[#087CFF] hover:bg-[#087CFF] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 md:block"
        >
          {isLoggingOut ? "Logging out..." : "Log Out"}
        </button>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
        >
          {menuOpen ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* LOGOUT ERROR */}
      {logoutError && (
        <p
          role="alert"
          className="bg-red-50 px-5 py-2 text-center text-sm text-red-600"
        >
          {logoutError}
        </p>
      )}

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-lg md:hidden">
          <div className="flex flex-col gap-5">
            <a
              href="#listings"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold text-slate-900 transition-colors hover:text-[#087CFF]"
            >
              For Students
            </a>

            <a
              href="/admin/dashboard"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#087CFF]"
            >
              For Landlords
            </a>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full rounded-xl bg-[#087CFF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#006BE6] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? "Logging out..." : "Log Out"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
