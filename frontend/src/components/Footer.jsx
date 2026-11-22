
import { Link } from "react-router-dom";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M19.5 8.2a7.1 7.1 0 0 1-4.2-1.4v8.1a6.1 6.1 0 1 1-6.1-6.1c.4 0 .8 0 1.2.1v3.2a2.9 2.9 0 1 0 1.7 2.8V2.5h3.2a4.7 4.7 0 0 0 4.2 4.2v1.5Z" />
    </svg>
  );
}

const studentLinks = [
  { label: "Browse Listings", path: "/student/dashboard" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Safety Tips", path: "/safety-tips" },
];

const landlordLinks = [
  { label: "List Property", path: "/landlord/list-property" },
  { label: "Support", path: "/support" },
];

const companyLinks = [
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const footerLinkStyle =
  "text-sm text-slate-400 transition-colors duration-200 hover:text-[#087CFF]";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#10192D] text-white">

      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 lg:py-16">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND INFORMATION */}
          <div>

            <Link
              to="/student/dashboard"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2"
            >
              <span className="text-3xl font-extrabold">
                R<span className="text-[#087CFF]">.</span>
              </span>

              <span className="text-xl font-bold">
                Resi<span className="text-[#087CFF]">Sure</span>
              </span>
            </Link>

            <p className="mt-5 max-w-[280px] text-sm leading-7 text-slate-400">
              South Africa's student accommodation platform.
              Helping students find secure, verified and suitable
              places to call home.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="mt-7 flex items-center gap-3">

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-all duration-200 hover:border-[#087CFF] hover:bg-[#087CFF] hover:text-white"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-all duration-200 hover:border-[#087CFF] hover:bg-[#087CFF] hover:text-white"
              >
                <TikTokIcon />
              </a>

            </div>

          </div>

          {/* STUDENTS */}
          <div>
            <h3 className="mb-6 text-xs font-bold tracking-[0.15em] text-white">
              FOR STUDENTS
            </h3>

            <ul className="space-y-4">
              {studentLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={
                      link.path === "/student/dashboard"
                        ? scrollToTop
                        : undefined
                    }
                    className={footerLinkStyle}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LANDLORDS */}
          <div>
            <h3 className="mb-6 text-xs font-bold tracking-[0.15em] text-white">
              FOR LANDLORDS
            </h3>

            <ul className="space-y-4">
              {landlordLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={footerLinkStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="mb-6 text-xs font-bold tracking-[0.15em] text-white">
              COMPANY
            </h3>

            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={footerLinkStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM FOOTER */}
        <div className="mt-14 border-t border-slate-700 pt-7">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <p className="text-xs text-slate-500">
              © 2026 ResiSure. All rights reserved.
            </p>

            {/* LEGAL LINKS */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-20 md:pb-0 md:pr-60">

              <Link
                to="/privacy-policy"
                className="cursor-pointer text-xs text-slate-400 transition-colors duration-200 hover:text-[#087CFF]"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms-of-service"
                className="cursor-pointer text-xs text-slate-400 transition-colors duration-200 hover:text-[#087CFF]"
              >
                Terms of Service
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}
