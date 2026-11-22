
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import PropertyFilters from "../components/PropertyFilters";
import PropertyCard from "../components/PropertyCard";
import RoomFinder from "../components/RoomFinder";
import Footer from "../components/Footer";

import { properties } from "../data/properties";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedUniversity, setSelectedUniversity] =
    useState("All Universities");

  const [filters, setFilters] = useState({
    nsfasAccredited: false,
    verified: false,
    furnished: false,
  });

  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState("grid");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // FILTER AND SORT PROPERTIES
  const filteredProperties = useMemo(() => {
    let results = properties.filter((property) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        property.name?.toLowerCase().includes(search) ||
        property.city?.toLowerCase().includes(search) ||
        property.university?.toLowerCase().includes(search) ||
        property.address?.toLowerCase().includes(search);

      const matchesCity =
        selectedCity === "All Cities" ||
        property.city === selectedCity;

      const matchesUniversity =
        selectedUniversity === "All Universities" ||
        property.university === selectedUniversity;

      const matchesNsfas =
        !filters.nsfasAccredited || property.nsfasAccredited;

      const matchesVerified =
        !filters.verified || property.verified;

      const matchesFurnished =
        !filters.furnished || property.furnished;

      const matchesFavorites =
        !showFavoritesOnly || favorites.includes(property.id);

      return (
        matchesSearch &&
        matchesCity &&
        matchesUniversity &&
        matchesNsfas &&
        matchesVerified &&
        matchesFurnished &&
        matchesFavorites &&
        property.available !== false
      );
    });

    if (sortBy === "price-low") {
      results = [...results].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "price-high") {
      results = [...results].sort(
        (a, b) => b.price - a.price
      );
    }

    return results;
  }, [
    searchTerm,
    selectedCity,
    selectedUniversity,
    filters,
    sortBy,
    showFavoritesOnly,
    favorites,
  ]);

  // FAVOURITES
  const toggleFavorite = (propertyId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(propertyId)
        ? currentFavorites.filter((id) => id !== propertyId)
        : [...currentFavorites, propertyId]
    );
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity("All Cities");
    setSelectedUniversity("All Universities");

    setFilters({
      nsfasAccredited: false,
      verified: false,
      furnished: false,
    });

    setShowFavoritesOnly(false);
    setSortBy("recommended");
  };

  // NAVIGATE TO INDIVIDUAL PROPERTY DETAILS
  const handleViewDetails = (property) => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">

      {/* NAVIGATION */}
      <Navbar />

      {/* SEARCH SECTION */}
      <section className="border-b border-slate-100 bg-white px-5 py-5">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto flex h-[54px] w-full max-w-[675px] items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm transition-all duration-200 focus-within:border-[#087CFF] focus-within:ring-4 focus-within:ring-blue-100"
        >
          {/* SEARCH ICON */}
          <div className="flex shrink-0 items-center pl-3 text-slate-400">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </div>

          {/* SEARCH INPUT */}
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search city, university, or area..."
            className="h-full min-w-0 flex-1 border-0 bg-transparent px-1 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
          />

          {/* SEARCH BUTTON */}
          <button
            type="submit"
            className="flex h-full shrink-0 items-center justify-center rounded-full bg-[#087CFF] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#006BE6]"
          >
            Search
          </button>
        </form>
      </section>

      {/* MAIN LISTINGS SECTION */}
      <main className="mx-auto max-w-[1320px] px-5 pb-16 pt-12 md:px-8">

        {/* LISTINGS HEADING AND CONTROLS */}
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-[28px] font-bold leading-tight tracking-tight text-slate-900 md:text-[32px]">
              Student Accommodation
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              <span className="font-semibold text-slate-700">
                {filteredProperties.length}
              </span>{" "}
              {filteredProperties.length === 1
                ? "property available"
                : "properties available"}
            </p>
          </div>

          {/* SORT AND VIEW CONTROLS */}
          <div className="flex items-center gap-2">

            <label className="sr-only" htmlFor="sort-properties">
              Sort properties
            </label>

            <select
              id="sort-properties"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="h-10 max-w-[165px] rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none transition-colors focus:border-[#087CFF]"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* GRID / LIST SWITCH */}
            <div className="flex h-10 items-center rounded-full border border-slate-200 bg-white p-1">

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-50 text-[#087CFF]"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-50 text-[#087CFF]"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M8 6h13M8 12h13M8 18h13" />
                  <circle cx="4" cy="6" r="1" />
                  <circle cx="4" cy="12" r="1" />
                  <circle cx="4" cy="18" r="1" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* FILTERS AND PROPERTY GRID */}
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[307px_minmax(0,1fr)]">

          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block">
            <PropertyFilters
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedUniversity={selectedUniversity}
              setSelectedUniversity={setSelectedUniversity}
              filters={filters}
              setFilters={setFilters}
              onClear={clearFilters}
            />
          </aside>

          {/* PROPERTY RESULTS */}
          <section id="listings" className="min-w-0">

            {/* MOBILE CONTROLS */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 lg:hidden">

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#087CFF] hover:text-[#087CFF]"
              >
                Filters
              </button>

              <button
                type="button"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  showFavoritesOnly
                    ? "border-[#087CFF] bg-blue-50 text-[#087CFF]"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                ♥ Saved ({favorites.length})
              </button>
            </div>

            {/* DESKTOP SAVED FILTER */}
            <div className="mb-4 hidden justify-end lg:flex">
              <button
                type="button"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  showFavoritesOnly
                    ? "border-[#087CFF] bg-blue-50 text-[#087CFF]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-[#087CFF]"
                }`}
              >
                ♥ Saved ({favorites.length})
              </button>
            </div>

            {/* PROPERTY CARDS */}
            {filteredProperties.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid grid-cols-1 gap-5"
                }
              >
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                    onViewDetails={() => handleViewDetails(property)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <div className="mb-4 text-4xl text-slate-300">⌕</div>

                <h3 className="text-lg font-semibold text-slate-900">
                  No properties found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  We couldn't find properties matching your search or
                  filters. Try changing your search or clearing the filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-full bg-[#087CFF] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#006BE6]"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">

          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-slate-950/40"
          />

          <div className="absolute right-0 top-0 h-full w-[min(88%,360px)] overflow-y-auto bg-white p-5 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="rounded-lg p-2 text-xl text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <PropertyFilters
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedUniversity={selectedUniversity}
              setSelectedUniversity={setSelectedUniversity}
              filters={filters}
              setFilters={setFilters}
              onClear={clearFilters}
            />

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full rounded-full bg-[#087CFF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#006BE6]"
            >
              Show {filteredProperties.length} properties
            </button>
          </div>
        </div>
      )}

      {/* FOOTER AND ROOM FINDER */}
      <Footer />
      <RoomFinder />

    </div>
  );
}
