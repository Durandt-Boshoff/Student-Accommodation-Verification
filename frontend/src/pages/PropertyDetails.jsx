import React, { useState } from 'react';

const MOCK_PROPERTY = {
  id: 1,
  name: 'Focus 1 Student Accommodation',
  address: '42 Joubert Street, Braamfontein, Johannesburg',
  startingPrice: 5000,
  platformVerified: true,
  institutionAccredited: true,
  accreditedBy: 'University of Johannesburg (UJ) & Wits',
  description:
    'Modern, secure student living in the heart of Braamfontein. Located within walking distance of major campuses, public transport routes, and study hubs. All utilities and uncapped fibre included.',
  images: [
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
  ],
  amenities: [
    'Uncapped Wi-Fi',
    '24/7 Biometric Security',
    'Study Room',
    'Laundry Facilities',
    'Backup Power / Solar',
    'Communal Lounge',
  ],
  rooms: [
    {
      type: 'Single Room',
      price: 5800,
      available: 4,
      details: 'Private bedroom with study desk, wardrobe, and shared modern kitchen/bathroom.',
    },
    {
      type: 'Sharing Room (2-Sleeper)',
      price: 5000,
      available: 7,
      details: 'Spacious twin room with two beds, two study desks, and high-speed Wi-Fi.',
    },
  ],
  distances: [
    { campus: 'University of the Witwatersrand (Wits)', distance: '0.8 km (10 min walk)' },
    { campus: 'University of Johannesburg (UJ Doornfontein)', distance: '2.1 km (7 min drive)' },
    { campus: 'Rosebank College Braamfontein', distance: '0.5 km (6 min walk)' },
  ],
};

export default function PropertyDetails({ property = MOCK_PROPERTY }) {
  const [saved, setSaved] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Verification Badges */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {property.platformVerified && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                ✓ Platform Verified
              </span>
            )}
            {property.institutionAccredited && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                🎓 Institution Accredited ({property.accreditedBy})
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{property.name}</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">{property.address}</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs uppercase tracking-wide text-gray-500">Starting from</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
                R{property.startingPrice.toLocaleString()}
                <span className="text-sm font-normal text-gray-500"> / month</span>
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-64 md:h-80 object-cover rounded-xl md:col-span-2"
            />
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {property.images.slice(1, 3).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${property.name} view ${idx + 2}`}
                  className="w-full h-32 md:h-38 object-cover rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-2">About This Property</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Amenities & Security</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm font-medium text-gray-700"
                  >
                    <span className="text-indigo-600 font-bold">•</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Available Room Types */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Available Room Types</h2>
              <div className="space-y-4">
                {property.rooms.map((room) => (
                  <div
                    key={room.type}
                    className="p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-300 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{room.type}</h3>
                        <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 font-medium">
                          {room.available} beds left
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{room.details}</p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <p className="font-bold text-lg text-gray-900">
                        R{room.price.toLocaleString()}/pm
                      </p>
                      <button
                        onClick={() => setSelectedRoom(room.type)}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                      >
                        {selectedRoom === room.type ? 'Enquiry Sent ✓' : 'Enquire Room'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <h3 className="font-bold text-gray-900">Interested in this place?</h3>
              <p className="text-xs text-gray-500">
                Never pay upfront deposits before viewing or confirming accreditation status.
              </p>
              <a
                href="#rooms"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedRoom('General Enquiry');
                }}
                className="block w-full text-center py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                {selectedRoom ? 'Enquiry Recorded ✓' : 'Request Viewing / Info'}
              </a>
              <button
                onClick={() => setSaved(!saved)}
                className={`w-full py-3 px-4 rounded-xl border font-semibold transition ${
                  saved
                    ? 'bg-pink-50 border-pink-200 text-pink-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {saved ? '♥ Saved to Shortlist' : '♡ Save Property'}
              </button>
            </div>

            {/* Distance to Universities */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">Distance to Institutions</h3>
              <ul className="space-y-3">
                {property.distances.map((item) => (
                  <li key={item.campus} className="text-sm border-b border-gray-100 pb-2 last:border-0">
                    <p className="font-medium text-gray-800">{item.campus}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.distance}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verification Transparency Notice */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold">Verification Notice</p>
              <p>
                Verification confirms provider identity and accreditation records at review time,
                but students should always inspect rooms and lease terms before signing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}