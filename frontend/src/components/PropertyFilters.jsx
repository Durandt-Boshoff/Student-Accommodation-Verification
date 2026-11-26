
const cities = [
  "All Cities",
  "Johannesburg",
  "Pretoria",
  "Cape Town",
  "Durban",
  "Stellenbosch",
  "Bloemfontein",
  "Gqeberha",
  "East London",
  "Polokwane",
  "Pietermaritzburg",
  "Mbombela",
  "Kimberley",
  "Rustenburg",
  "Mahikeng",
  "Mthatha",
];

const universities = [
  "All Universities",
  "University of Cape Town (UCT)",
  "University of the Witwatersrand (Wits)",
  "University of Pretoria (UP)",
  "Stellenbosch University (SU)",
  "University of KwaZulu-Natal (UKZN)",
  "University of the Free State (UFS)",
  "University of Johannesburg (UJ)",
  "Rhodes University",
  "University of the Western Cape (UWC)",
  "University of Fort Hare (UFH)",
  "Nelson Mandela University (NMU)",
  "North-West University (NWU)",
  "University of Limpopo (UL)",
  "University of Venda (UNIVEN)",
  "University of Mpumalanga (UMP)",
  "University of South Africa (UNISA)",
  "Sefako Makgatho Health Sciences University (SMU)",
  "Walter Sisulu University (WSU)",
  "Tshwane University of Technology (TUT)",
  "Vaal University of Technology (VUT)",
  "Central University of Technology (CUT)",
  "Durban University of Technology (DUT)",
  "Mangosuthu University of Technology (MUT)",
  "Cape Peninsula University of Technology (CPUT)",
  "Sol Plaatje University (SPU)",
  "University of Zululand (UNIZULU)",
];

const accommodationFeatures = [
  {
    key: "nsfasAccredited",
    label: "NSFAS Accredited",
  },
  {
    key: "verified",
    label: "ResiSure Verified",
  },
  {
    key: "furnished",
    label: "Furnished Living",
  },
];

export default function PropertyFilters({
  selectedCity,
  setSelectedCity,
  selectedUniversity,
  setSelectedUniversity,
  filters,
  setFilters,
  onClear,
}) {
  const handleCheckbox = (name) => {
    setFilters((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  const activeFeatureCount = accommodationFeatures.filter(
    (item) => filters[item.key]
  ).length;

  const hasActiveFilters =
    selectedCity !== "All Cities" ||
    selectedUniversity !== "All Universities" ||
    activeFeatureCount > 0;

  return (
    <aside className="w-full rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">

      {/* FILTER HEADING */}
      <div className="mb-7 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold tracking-wider text-slate-400">
            REFINE YOUR SEARCH
          </h2>

          {hasActiveFilters && (
            <p className="mt-1 text-xs font-medium text-[#087CFF]">
              Filters applied
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilters}
          className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800 hover:underline disabled:cursor-not-allowed disabled:text-slate-300 disabled:no-underline"
        >
          Clear all
        </button>
      </div>

      {/* CITY FILTER */}
      <div className="mb-7">
        <label
          htmlFor="city"
          className="mb-3 block text-xs font-semibold tracking-wide text-slate-500"
        >
          CITY
        </label>

        <select
          id="city"
          value={selectedCity}
          onChange={(event) => setSelectedCity(event.target.value)}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-[#087CFF] focus:ring-4 focus:ring-blue-50"
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* UNIVERSITY FILTER */}
      <div className="mb-7">
        <label
          htmlFor="university"
          className="mb-3 block text-xs font-semibold tracking-wide text-slate-500"
        >
          UNIVERSITY
        </label>

        <select
          id="university"
          value={selectedUniversity}
          onChange={(event) =>
            setSelectedUniversity(event.target.value)
          }
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-[#087CFF] focus:ring-4 focus:ring-blue-50"
        >
          {universities.map((university) => (
            <option key={university} value={university}>
              {university}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 border-t border-slate-100" />

      {/* ACCOMMODATION FEATURES */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xs font-semibold tracking-wide text-slate-500">
            ACCOMMODATION FEATURES
          </h3>

          {activeFeatureCount > 0 && (
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-[#087CFF]">
              {activeFeatureCount} selected
            </span>
          )}
        </div>

        <div className="space-y-6">
          {accommodationFeatures.map((item) => (
            <label
              key={item.key}
              className="group flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={Boolean(filters[item.key])}
                onChange={() => handleCheckbox(item.key)}
                className="h-5 w-5 cursor-pointer accent-[#087CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087CFF] focus-visible:ring-offset-2"
              />

              <span className="text-sm text-slate-600 transition-colors group-hover:text-[#087CFF]">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

    </aside>
  );
}
