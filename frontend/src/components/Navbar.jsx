import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  logoutUser,
} from "../services/authServices";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const navigate = useNavigate();
  const menuRef = useRef(null);

  // LOAD AUTHENTICATED USER
  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (isMounted) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Unable to load navbar user:", error);

        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  // CLOSE MENU WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // CLOSE MENU WITH ESCAPE KEY
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // LOGOUT
  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logoutUser();

      setUser(null);
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

  // CLOSE MOBILE MENU AFTER NAVIGATION
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      ref={menuRef}
      className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white"
    >
      <nav
        className="mx-auto flex h-19 max-w-360 items-center justify-between px-5 md:px-10"
        aria-label="Main navigation"
      >
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087CFF] focus-visible:ring-offset-4"
          aria-label="ResiSure home"
        >
          <span className="text-3xl font-extrabold tracking-tight text-slate-950">
            R<span className="text-[#087CFF]">.</span>
          </span>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Resi<span className="text-[#087CFF]">Sure</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-10 md:flex">
          {!isLoading && user?.role === "student" && (
            <Link
              to="/properties"
              className="border-b-2 border-slate-900 py-2 text-sm font-semibold text-slate-900 transition-colors"
            >
              Browse
            </Link>
          )}

          {!isLoading && user?.role === "admin" && (
            <>
              <Link
                to="/admin/dashboard"
                className="border-b-2 border-slate-900 py-2 text-sm font-semibold text-slate-900 transition-colors"
              >
                Admin Dashboard
              </Link>

              <Link
                to="/admin/properties"
                className="py-2 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-[#087CFF]"
              >
                Manage Accommodation
              </Link>
            </>
          )}

          {/* LANDLORD NAVIGATION */}
          <Link
            to="/landlord/list-property"
            className="py-2 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-[#087CFF]"
          >
            For Landlords
          </Link>

          {isLoading && (
            <span className="text-sm text-slate-400" aria-live="polite">
              Loading...
            </span>
          )}
        </div>

        {/* DESKTOP LOGOUT BUTTON */}
        {!isLoading && user && (
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="hidden rounded-full border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-[#087CFF] hover:bg-[#087CFF] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 md:block"
          >
            {isLoggingOut ? "Logging out..." : "Log Out"}
          </button>
        )}

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087CFF] md:hidden"
        >
          {menuOpen ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
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
              aria-hidden="true"
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
        <div
          id="mobile-navigation"
          className="border-t border-slate-100 bg-white px-5 py-5 shadow-lg md:hidden"
        >
          <div className="flex flex-col gap-5">
            {isLoading && (
              <p className="text-sm text-slate-400">
                Loading navigation...
              </p>
            )}

            {!isLoading && user?.role === "student" && (
              <Link
                to="/properties"
                onClick={closeMenu}
                className="text-sm font-semibold text-slate-900 transition-colors hover:text-[#087CFF]"
              >
                Browse
              </Link>
            )}

            {!isLoading && user?.role === "admin" && (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={closeMenu}
                  className="text-sm font-semibold text-slate-900 transition-colors hover:text-[#087CFF]"
                >
                  Admin Dashboard
                </Link>

                <Link
                  to="/admin/properties"
                  onClick={closeMenu}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-[#087CFF]"
                >
                  Manage Accommodation
                </Link>
              </>
            )}

            {/* LANDLORD LINK */}
            <Link
              to="/landlord/list-property"
              onClick={closeMenu}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#087CFF]"
            >
              For Landlords
            </Link>

            {!isLoading && user && (
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full rounded-xl bg-[#087CFF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#006BE6] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? "Logging out..." : "Log Out"}
              </button>
            )}

            {!isLoading && !user && (
              <div className="flex flex-col gap-4">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-sm font-medium text-slate-600 hover:text-[#087CFF]"
                >
                  Log In
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="rounded-xl bg-[#087CFF] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#006BE6]"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
