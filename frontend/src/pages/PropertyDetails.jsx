
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomFinder from "../components/RoomFinder";
import { properties } from "../data/properties";

export default function PropertyDetails() {
  const { id } = useParams();

  const property = properties.find(
    (item) => String(item.id) === id
  );

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />

        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Property not found
          </h1>

          <p className="mt-3 text-slate-500">
            This property may no longer be available.
          </p>

          <Link
            to="/student/dashboard"
            className="mt-6 inline-flex rounded-full bg-[#087CFF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#006BE6]"
          >
            Back to listings
          </Link>
        </main>

        <Footer />
        <RoomFinder />
      </div>
    );
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-[1100px] px-5 py-10 md:px-8">

        {/* BACK TO LISTINGS */}
        <Link
          to="/student/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#087CFF]"
        >
          <span aria-hidden="true">←</span>
          Back to listings
        </Link>

        {/* PROPERTY IMAGE */}
        <div className="mt-6 overflow-hidden rounded-3xl bg-slate-100">
          <img
            src={property.image}
            alt={property.name}
            className="h-[260px] w-full object-cover sm:h-[380px] lg:h-[460px]"
          />
        </div>

        {/* PROPERTY INFORMATION */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">

          <section>
            <div className="flex flex-wrap gap-2">

              {property.nsfasAccredited && (
                <span className="rounded-full border border-amber-200 bg-white px-3 py-1.5 text-xs font-semibold text-amber-700">
                  NSFAS Accredited
                </span>
              )}

              {property.verified && (
                <span className="rounded-full border border-green-200 bg-white px-3 py-1.5 text-xs font-semibold text-green-700">
                  ✓ Verified
                </span>
              )}

              {property.furnished && (
                <span className="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#087CFF]">
                  Furnished
                </span>
              )}
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
              {property.name}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <span aria-hidden="true">⌖</span>
              {property.address}
            </p>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Property Overview
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore this student accommodation option in{" "}
                {property.city}. Review the property information and
                accommodation features before making a decision.
              </p>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Accommodation Details
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-white p-5">
                  <p className="text-sm text-slate-500">City</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {property.city}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5">
                  <p className="text-sm text-slate-500">University</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {property.university}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5">
                  <p className="text-sm text-slate-500">Room types</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {property.roomTypes}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5">
                  <p className="text-sm text-slate-500">Furnished</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {property.furnished ? "Yes" : "No"}
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* PRICE AND AVAILABILITY */}
          <aside>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">

              <p className="text-sm text-slate-500">
                Monthly rental
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {formatPrice(property.price)}
                <span className="text-sm font-normal text-slate-500">
                  {" "}/ month
                </span>
              </p>

              <div className="my-6 border-t border-slate-100" />

              <p className="flex items-center gap-2 text-sm font-medium">
                <span className={`h-2.5 w-2.5 rounded-full ${
                  property.available ? "bg-green-500" : "bg-slate-400"
                }`} />

                {property.available ? "Available" : "Currently unavailable"}
              </p>

              <Link
                to="/student/dashboard"
                className="mt-6 flex w-full items-center justify-center rounded-2xl bg-[#087CFF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#006BE6]"
              >
                Back to listings
              </Link>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                Phase 1 demonstration. Property information and
                verification labels are illustrative sample data.
              </p>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
      <RoomFinder />
    </div>
  );
}
