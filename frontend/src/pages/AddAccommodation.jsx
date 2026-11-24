import { useState } from "react";

const AMENITY_OPTIONS = [
  "Uncapped Wi-Fi",
  "24/7 Security",
  "Study Room",
  "Laundry",
  "Backup Power",
  "NSFAS Accredited",
];

const labelClass = "mb-1.5 block text-sm font-medium text-[#1E293B]";

const inputClass =
  "h-[45px] w-full rounded-2xl border border-[#E2E8F0] bg-white px-3.5 text-sm text-[#1E293B] outline-none transition-colors duration-200 placeholder:text-[#94A3B8] focus:border-[#087CFF] focus:ring-2 focus:ring-[#DBEAFE]";

export default function AddAccommodation() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    area: "Braamfontein",
    price: "",
    roomType: "Single & Sharing",
    availableBeds: "",
    accreditedInstitution: "",
    providerName: "",
    providerContact: "",
    imageUrl: "",
    description: "",
    amenities: [],
    popiaConsent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ready to connect to Durandt's Express POST /api/accommodations endpoint
    console.log("Submitting accommodation payload:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-8">
        <div className="w-full max-w-102.5 rounded-3xl border border-[#F1F5F9] bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF] text-xl font-bold text-[#087CFF]">
            ✓
          </div>

          <h2 className="mt-5 text-2xl font-bold text-[#0F172A]">
            Listing Submitted for Review
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#64748B]">
            Thank you! Your accommodation details have been sent to our Admin
            team for{" "}
            <span className="font-semibold text-[#1E293B]">
              Platform Verification
            </span>{" "}
            and{" "}
            <span className="font-semibold text-[#1E293B]">
              Institution Accreditation
            </span>{" "}
            checks.
          </p>

          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 w-full rounded-2xl bg-[#087CFF] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#006BE6]"
          >
            Submit Another Property
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-330 rounded-3xl border border-[#F1F5F9] bg-white p-6 shadow-sm sm:p-8 lg:p-10">

        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold leading-tight text-[#0F172A] md:text-[32px]">
            Add Student Accommodation
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
            Submit property details for administrative verification before
            publishing to students.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* PROPERTY DETAILS */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">
              Property Details
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Property Name */}
              <div>
                <label className={labelClass}>
                  Property Name *
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Jorissen Student Residence"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Area */}
              <div>
                <label className={labelClass}>
                  Area / Suburb *
                </label>

                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Braamfontein">Braamfontein</option>
                  <option value="Auckland Park">Auckland Park</option>
                  <option value="Doornfontein">Doornfontein</option>
                  <option value="Johannesburg CBD">Johannesburg CBD</option>
                  <option value="Pretoria / Hatfield">
                    Pretoria / Hatfield
                  </option>
                </select>
              </div>

            </div>
          </section>

          {/* ADDRESS */}
          <section>
            <label className={labelClass}>
              Full Street Address *
            </label>

            <input
              type="text"
              name="address"
              required
              placeholder="e.g. 88 De Korte Street, Braamfontein"
              value={formData.address}
              onChange={handleChange}
              className={inputClass}
            />
          </section>

          {/* RENT, ROOM TYPE & BEDS */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">
              Accommodation Information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

              {/* Monthly Rent */}
              <div>
                <label className={labelClass}>
                  Monthly Rent (ZAR) *
                </label>

                <input
                  type="number"
                  name="price"
                  required
                  min="500"
                  placeholder="5000"
                  value={formData.price}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Room Type */}
              <div>
                <label className={labelClass}>
                  Room Options *
                </label>

                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Single Room">Single Room</option>
                  <option value="Sharing Room">Sharing Room</option>
                  <option value="Single & Sharing">
                    Single & Sharing
                  </option>
                </select>
              </div>

              {/* Available Beds */}
              <div>
                <label className={labelClass}>
                  Available Beds *
                </label>

                <input
                  type="number"
                  name="availableBeds"
                  required
                  min="1"
                  placeholder="10"
                  value={formData.availableBeds}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

            </div>
          </section>

          {/* INSTITUTIONAL ACCREDITATION */}
          <section>
            <label className={labelClass}>
              Accredited Institution
              <span className="font-normal text-[#94A3B8]">
                {" "}
                (Optional)
              </span>
            </label>

            <input
              type="text"
              name="accreditedInstitution"
              placeholder="e.g. University of Johannesburg (UJ) / Wits"
              value={formData.accreditedInstitution}
              onChange={handleChange}
              className={inputClass}
            />

            <p className="mt-1.5 text-xs text-[#94A3B8]">
              Leave blank if the property is not university-accredited.
            </p>
          </section>

          {/* AMENITIES */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0F172A]">
              Included Amenities
            </h2>

            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((amenity) => {
                const active = formData.amenities.includes(amenity);

                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`rounded-2xl border px-3.5 py-2 text-xs font-medium transition-colors duration-200 ${
                      active
                        ? "border-[#087CFF] bg-[#087CFF] text-white"
                        : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {active ? "✓ " : "+ "}
                    {amenity}
                  </button>
                );
              })}
            </div>
          </section>

          {/* IMAGE & DESCRIPTION */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">
              Property Listing
            </h2>

            <div className="space-y-5">

              {/* Image URL */}
              <div>
                <label className={labelClass}>
                  Cover Image URL
                </label>

                <input
                  type="url"
                  name="imageUrl"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>
                  Property Description *
                </label>

                <textarea
                  name="description"
                  required
                  rows="4"
                  placeholder="Describe room setup, security measures, proximity to campus, and rules..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#E2E8F0] bg-white px-3.5 py-3 text-sm text-[#1E293B] outline-none transition-colors duration-200 placeholder:text-[#94A3B8] focus:border-[#087CFF] focus:ring-2 focus:ring-[#DBEAFE]"
                />
              </div>

            </div>
          </section>

          {/* PROVIDER VERIFICATION */}
          <section className="border-t border-[#F1F5F9] pt-8">

            <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">
              Provider Verification
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Provider Name */}
              <div>
                <label className={labelClass}>
                  Landlord / Manager Full Name *
                </label>

                <input
                  type="text"
                  name="providerName"
                  required
                  placeholder="Full legal name"
                  value={formData.providerName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Provider Contact */}
              <div>
                <label className={labelClass}>
                  Verification Contact (Phone / Email) *
                </label>

                <input
                  type="text"
                  name="providerContact"
                  required
                  placeholder="e.g. 082 123 4567"
                  value={formData.providerContact}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

            </div>
          </section>

          {/* POPIA CONSENT */}
          <div className="flex items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">

            <input
              type="checkbox"
              id="popiaConsent"
              name="popiaConsent"
              required
              checked={formData.popiaConsent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-[#CBD5E1] text-[#087CFF] focus:ring-2 focus:ring-[#DBEAFE]"
            />

            <label
              htmlFor="popiaConsent"
              className="text-xs leading-5 text-[#64748B]"
            >
              In compliance with{" "}
              <span className="font-semibold text-[#1E293B]">
                POPIA
              </span>
              , I consent to my contact and property ownership details being
              used strictly by platform administrators to verify this
              listing's legitimacy.
            </label>

          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full rounded-2xl bg-[#087CFF] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#006BE6]"
          >
            Submit Accommodation for Verification
          </button>

        </form>
      </div>
    </div>
  );
}