export default function SearchBar() {
  return (
    <section className="w-full border-b border-slate-100 bg-white px-5 py-5 md:py-6">

      <div className="mx-auto flex w-full max-w-[1440px] justify-center">

        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex h-[54px] w-full max-w-[675px] items-center gap-3 rounded-full border border-slate-200 bg-white px-4 shadow-sm transition-all duration-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50"
        >

          {/* SEARCH ICON */}
          <svg
            className="h-5 w-5 shrink-0 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          {/* SEARCH INPUT */}
          <input
            type="search"
            placeholder="Search city, university, or area..."
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />

          {/* SEARCH BUTTON */}
          <button
            type="submit"
            className="shrink-0 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
          >
            Search
          </button>

        </form>

      </div>

    </section>
  );
}