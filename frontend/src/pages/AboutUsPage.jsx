
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomFinder from "../components/RoomFinder";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Trust & Transparency",
    description:
      "We believe students deserve clear, reliable property information when making important accommodation decisions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Student-First",
    description:
      "We put students at the centre of our thinking, creating a simpler way to explore accommodation options.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
      </svg>
    ),
  },
  {
    title: "Community",
    description:
      "We want to make accommodation discovery more connected by bringing students and property owners together.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Quality Listings",
    description:
      "We encourage detailed property information so students can make more informed accommodation choices.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 21v-4h6v4M8 7h2m4 0h2M8 11h2m4 0h2" />
      </svg>
    ),
  },
];

const activities = [
  "Make student accommodation easier to discover.",
  "Give property owners a platform to present their accommodation.",
  "Help students and landlords connect through enquiries and applications.",
  "Encourage clearer information and greater transparency.",
];

function ValueCard({ value }) {
  return (
    <article className="group rounded-[22px] border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#087CFF] transition-colors duration-300 group-hover:bg-[#087CFF] group-hover:text-white">
        <span className="h-6 w-6">{value.icon}</span>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-slate-900">
        {value.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {value.description}
      </p>
    </article>
  );
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main>
        {/* INTRODUCTION / MISSION */}
        <section className="border-b border-slate-100 bg-gradient-to-br from-[#F1F7FF] via-[#F8FAFF] to-white px-5 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-[#087CFF]">
                About ResiSure
              </span>

              <h1 className="mt-7 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                A better way to find
                <span className="block text-[#087CFF]">
                  your student home.
                </span>
              </h1>

              <p className="mt-6 text-base leading-8 text-slate-500">
                Finding suitable student accommodation can be challenging.
                ResiSure was created to make that journey clearer by bringing
                students and accommodation providers together through one
                accessible platform.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-500">
                Our goal is to make discovering accommodation more
                straightforward, encourage informed decisions and create
                better connections between students and landlords.
              </p>
            </div>

            <div className="rounded-[26px] border border-blue-100 bg-white p-7 shadow-sm md:p-9">
              <h2 className="text-xl font-bold text-slate-900">
                What We Do
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                ResiSure is a student accommodation discovery and connection
                platform. We aim to make it easier for students to explore
                available options and for landlords to introduce their
                properties.
              </p>

              <ul className="mt-7 space-y-5">
                {activities.map((activity) => (
                  <li key={activity} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#087CFF]">
                      <svg
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m4 10 4 4 8-8" />
                      </svg>
                    </span>

                    <span className="text-sm leading-6 text-slate-500">
                      {activity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="bg-[#F8FAFC] px-5 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#087CFF]">
                Our values
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                What We Stand For
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-500">
                The principles behind ResiSure shape how we approach student
                accommodation and the people who use our platform.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <ValueCard key={value.title} value={value} />
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="px-5 py-20 md:py-24">
          <div className="mx-auto max-w-5xl rounded-[28px] bg-gradient-to-r from-[#087CFF] to-[#2865ED] px-6 py-14 text-center shadow-lg shadow-blue-100 md:px-14 md:py-16">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to Get Started?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-50 md:text-base">
              Whether you're a student exploring accommodation or a landlord
              interested in reaching students, ResiSure is here to help you
              take the next step.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-lg"
              >
                Browse Listings
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/70 bg-transparent px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#087CFF] hover:shadow-lg"
              >
                List Your Property
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <p className="mt-5 text-xs text-blue-100">
              Landlords can contact our team to enquire about listing
              accommodation.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <RoomFinder />
    </div>
  );
}
