
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerLinks = {
    Students: [
      { label: "How It Works", to: "/how-it-works" },
      { label: "Find Accommodation", to: "/properties" },
      { label: "Safety Tips", to: "/safety-tips" },
      { label: "Support", to: "/support" },
    ],
    Landlords: [
      { label: "List Your Property", to: "/landlord/list-property" },
      { label: "Property Management", to: "/admin/properties" },
      { label: "Verification Process", to: "/how-it-works" },
    ],
    Company: [
      { label: "About Us", to: "/about" },
      { label: "Contact Us", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms-of-service" },
    ],
  };

  return (
    <footer className="bg-[#101827] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <Link
              to="/"
              onClick={scrollToTop}
              className="inline-block text-2xl font-bold tracking-wide text-white transition-colors hover:text-[#087CFF]"
            >
              ResiSure
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-gray-400">
              Helping students find safer, more reliable accommodation
              through transparent property information and verification.
            </p>

            <div className="mt-6 flex items-center gap-4">

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 transition-colors hover:text-[#087CFF]"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    strokeWidth="1.8"
                  />
                  <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-gray-400 transition-colors hover:text-[#087CFF]"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.6 7.2a5.8 5.8 0 0 1-3.5-1.2v8.1a6.1 6.1 0 1 1-5.3-6.1v3.2a2.9 2.9 0 1 0 2.1 2.8V2h3.2a5.8 5.8 0 0 0 3.5 5.2Z" />
                </svg>
              </a>

            </div>
          </div>

          {/* FOOTER LINK COLUMNS */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {heading}
              </h3>

              <ul className="mt-5 space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      onClick={scrollToTop}
                      className="text-sm text-gray-400 transition-colors duration-200 hover:text-[#087CFF]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ResiSure. All rights reserved.
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              className="text-sm font-medium text-gray-400 transition-colors hover:text-[#087CFF]"
            >
              Back to top ↑
            </button>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
