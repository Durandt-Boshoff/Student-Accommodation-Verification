
import { useState } from "react";

export default function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  viewMode = "grid",
}) {
  const [imageFailed, setImageFailed] = useState(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      maximumFractionDigits: 0,
    }).format(price || 0);

  const isList = viewMode === "list";
  const isAvailable = property.available !== false;

  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md ${
        isList ? "flex flex-col sm:flex-row" : ""
      }`}
    >
      {/* PROPERTY IMAGE */}
      <div
        className={`relative shrink-0 overflow-hidden bg-slate-100 ${
          isList
            ? "h-[220px] sm:h-auto sm:min-h-[220px] sm:w-64 lg:w-72"
            : "h-[220px] w-full"
        }`}
      >
        {imageFailed || !property.image ? (
          <div className="flex h-full min-h-[220px] items-center justify-center px-4 text-center text-sm text-slate-400">
            Property image unavailable
          </div>
        ) : (
          <img
            src={property.image}
            alt={property.name || "Student accommodation"}
            onError={() => setImageFailed(true)}
            className="h-full min-h-[220px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* PROPERTY BADGES */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {property.nsfasAccredited && (
            <span className="rounded-full border border-amber-200 bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-amber-700 shadow-sm">
              NSFAS Accredited
            </span>
          )}

          {property.verified && (
            <span className="rounded-full border border-green-200 bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-green-700 shadow-sm">
              ✓ Verified
            </span>
          )}

          {property.furnished && (
            <span className="rounded-full border border-[#087CFF]/20 bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#087CFF] shadow-sm">
              Furnished
            </span>
          )}
        </div>

        {/* FAVOURITE BUTTON */}
        <button
          type="button"
          onClick={() => onToggleFavorite?.(property.id)}
          aria-label={
            isFavorite
              ? "Remove from favourites"
              : "Add to favourites"
          }
          aria-pressed={Boolean(isFavorite)}
          className={`absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/95 shadow-md transition-colors duration-200 ${
            isFavorite
              ? "text-red-500"
              : "text-slate-400 hover:text-red-500"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* PROPERTY DETAILS */}
      <div
        className={`flex min-w-0 flex-1 flex-col p-4 ${
          isList
            ? "justify-between sm:flex-row sm:items-center sm:gap-6 sm:p-6"
            : ""
        }`}
      >
        <div className="min-w-0 flex-1">
          {/* PRICE */}
          <div className="mb-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              {formatPrice(property.price)}
            </span>

            <span className="text-sm text-slate-500">/mo</span>
          </div>

          {/* PROPERTY NAME */}
          <h3 className="mb-2 truncate text-base font-semibold text-slate-900">
            {property.name}
          </h3>

          {/* ADDRESS */}
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <svg
              className="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>

            <span className="truncate">{property.address}</span>
          </div>

          {/* ROOM TYPES */}
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <svg
              className="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <rect x="4" y="3" width="16" height="18" rx="1" />
              <path d="M9 21V7h6v14M9 11h6" />
            </svg>

            <span>{property.roomTypes} room types</span>
          </div>

          {/* AVAILABILITY */}
          <div className="mb-4">
            {isAvailable ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Available
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                Currently unavailable
              </span>
            )}
          </div>
        </div>

        {/* VIEW DETAILS BUTTON */}
        <div className={isList ? "mt-2 sm:mt-0 sm:w-40 sm:shrink-0" : ""}>
          <button
            type="button"
            onClick={() => onViewDetails?.(property)}
            disabled={!isAvailable}
            className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#087CFF]/10 text-sm font-semibold text-[#087CFF] transition-colors duration-200 hover:bg-[#006BE6] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
