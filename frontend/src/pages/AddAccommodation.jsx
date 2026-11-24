import React, { useState } from 'react';

const AMENITY_OPTIONS = [
  'Uncapped Wi-Fi',
  '24/7 Security',
  'Study Room',
  'Laundry',
  'Backup Power',
  'NSFAS Accredited',
];

export default function AddAccommodation() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    area: 'Braamfontein',
    price: '',
    roomType: 'Single & Sharing',
    availableBeds: '',
    accreditedInstitution: '',
    providerName: '',
    providerContact: '',
    imageUrl: '',
    description: '',
    amenities: [],
    popiaConsent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
    console.log('Submitting accommodation payload:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Listing Submitted for Review</h2>
          <p className="text-sm text-gray-600">
            Thank you! Your accommodation details have been sent to our Admin team for{' '}
            <span className="font-semibold">Platform Verification</span> and{' '}
            <span className="font-semibold">Institution Accreditation</span> checks.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Submit Another Property
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add Student Accommodation</h1>
          <p className="text-sm text-gray-600 mt-1">
            Submit property details for administrative verification before publishing to students.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Property Name & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Jorissen Student Residence"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area / Suburb *</label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Braamfontein">Braamfontein</option>
                <option value="Auckland Park">Auckland Park</option>
                <option value="Doornfontein">Doornfontein</option>
                <option value="Johannesburg CBD">Johannesburg CBD</option>
                <option value="Pretoria / Hatfield">Pretoria / Hatfield</option>
              </select>
            </div>
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Street Address *
            </label>
            <input
              type="text"
              name="address"
              required
              placeholder="e.g. 88 De Korte Street, Braamfontein"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Price, Room Type & Beds */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Options *</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Single Room">Single Room</option>
                <option value="Sharing Room">Sharing Room</option>
                <option value="Single & Sharing">Single & Sharing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Institutional Accreditation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accredited Institution (Optional — leave blank if not university-accredited)
            </label>
            <input
              type="text"
              name="accreditedInstitution"
              placeholder="e.g. University of Johannesburg (UJ) / Wits"
              value={formData.accreditedInstitution}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Included Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((amenity) => {
                const active = formData.amenities.includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {active ? '✓ ' : '+ '}
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image URL & Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://..."
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Description *
            </label>
            <textarea
              name="description"
              required
              rows="3"
              placeholder="Describe room setup, security measures, proximity to campus, and rules..."
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Provider Verification Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Landlord / Manager Full Name *
              </label>
              <input
                type="text"
                name="providerName"
                required
                placeholder="Full legal name"
                value={formData.providerName}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Verification Contact (Phone / Email) *
              </label>
              <input
                type="text"
                name="providerContact"
                required
                placeholder="e.g. 082 123 4567"
                value={formData.providerContact}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* POPIA Compliance Checkbox */}
          <div className="flex items-start gap-2.5 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
            <input
              type="checkbox"
              id="popiaConsent"
              name="popiaConsent"
              required
              checked={formData.popiaConsent}
              onChange={handleChange}
              className="mt-1 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="popiaConsent" className="text-xs text-gray-600 leading-relaxed">
              In compliance with <span className="font-semibold">POPIA</span>, I consent to my
              contact and property ownership details being used strictly by platform administrators
              to verify this listing's legitimacy.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-sm"
          >
            Submit Accommodation for Verification
          </button>
        </form>
      </div>
    </div>
  );
}
