import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const studentSteps = [
  {
    number: "01",
    title: "Discover your options",
    description:
      "Explore student accommodation near your university. Filter listings by location, budget, room type and other preferences to find a place that suits your needs.",
  },
  {
    number: "02",
    title: "Submit an application",
    description:
      "Found a property you love? Submit your application and provide the necessary information and supporting documents.",
  },
  {
    number: "03",
    title: "Hear from the landlord",
    description:
      "The landlord can review your application and get in touch with you to discuss availability and the next steps.",
  },
  {
    number: "04",
    title: "Prepare for move-in",
    description:
      "Once your application is approved, finalise your arrangements and get ready to settle into your new student home.",
  },
];

const landlordSteps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Get started by creating an account and providing the details needed to introduce yourself as an accommodation provider.",
  },
  {
    number: "02",
    title: "Add your property",
    description:
      "Share important property information, including its location, rental prices, available rooms, facilities and photographs.",
  },
  {
    number: "03",
    title: "Submit for review",
    description:
      "Submit your property information and supporting documents for review before your accommodation is made available to students.",
  },
  {
    number: "04",
    title: "Connect with students",
    description:
      "Once your listing is approved, students can discover your accommodation and express interest in applying.",
  },
];

function StepCard({ step, reverse }) {
  return (
    <div
      className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1 w-full">
        <div className="bg-white border border-slate-100 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-lg transition duration-300">
          <span className="text-sm font-semibold tracking-widest text-[#087CFF]">
            STEP {step.number}
          </span>

          <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mt-3 mb-3">
            {step.title}
          </h3>

          <p className="text-slate-500 leading-7 text-sm md:text-base">
            {step.description}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-[#087CFF] text-white flex items-center justify-center text-lg font-semibold shadow-lg shadow-blue-100">
        {step.number}
      </div>

      <div className="flex-1 hidden md:block" />
    </div>
  );
}

function ProcessSection({ id, label, title, description, steps, buttonText, buttonLink }) {
  return (
    <section id={id} className="py-16 md:py-20 scroll-mt-24">
      <div className="max-w-3xl mx-auto text-center mb-14 px-4">
        <span className="inline-block text-sm font-semibold uppercase tracking-widest text-[#087CFF] mb-3">
          {label}
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
          {title}
        </h2>

        <p className="text-slate-500 leading-7">
          {description}
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="absolute hidden md:block left-1/2 top-7 bottom-7 w-px bg-blue-100 -translate-x-1/2" />

        <div className="space-y-7 md:space-y-10">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-12 px-4">
        <Link
          to={buttonLink}
          className="inline-flex items-center justify-center gap-2 bg-[#087CFF] hover:bg-[#006BE6] text-white font-semibold px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          {buttonText}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero section */}
        <section className="bg-[#F1F7FF] px-4 py-20 md:py-28 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-[#087CFF] mb-4">
              Your journey starts here
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Student accommodation,
              <span className="block text-[#087CFF]">
                made simpler.
              </span>
            </h1>

            <p className="text-slate-600 text-base md:text-lg leading-8 max-w-2xl mx-auto">
              Finding your next student home shouldn't be complicated.
              Whether you're searching for a place to stay or looking to
              welcome new tenants, ResiSure makes getting started easier.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-14 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              How ResiSure works
            </h2>

            <p className="text-slate-500 leading-7">
              We've made the process straightforward. Follow a few simple
              steps to find accommodation or introduce your property to
              students looking for their next home.
            </p>
          </div>
        </section>

        {/* Student process */}
        <ProcessSection
          id="students"
          label="For students"
          title="Find a place to call home"
          description="From discovering available accommodation to preparing for move-in, here's how your student housing journey works."
          steps={studentSteps}
          buttonText="Browse Listings"
          buttonLink="/properties"
        />

        {/* Landlord process */}
        <section className="bg-[#F8FAFC]">
          <ProcessSection
            id="landlords"
            label="For landlords"
            title="List your accommodation"
            description="Reach students searching for accommodation by introducing your property through the ResiSure platform."
            steps={landlordSteps}
            buttonText="Explore the landlord process"
            buttonLink="/how-it-works#landlords"
          />
        </section>

        {/* Bottom CTA */}
        <section className="px-4 py-20">
          <div className="max-w-5xl mx-auto bg-[#101827] rounded-2xl px-6 py-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
              Ready to get started?
            </h2>

            <p className="text-slate-300 leading-7 max-w-xl mx-auto mb-8">
              Take the next step towards a better student accommodation
              experience with ResiSure.
            </p>

            <Link
              to="/properties"
              className="inline-flex items-center gap-2 bg-[#087CFF] hover:bg-[#006BE6] text-white font-semibold px-8 py-3.5 rounded-lg transition duration-300"
            >
              Explore Accommodation
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}