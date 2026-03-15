type LibraryFiltersProps = {
  country: string
  type: string
  diet: string

  countries: string[]
  types: string[]
  diets: string[]

  onCountryChange: (value: string) => void
  onTypeChange: (value: string) => void
  onDietChange: (value: string) => void
}

export default function LibraryFilters({
  country,
  type,
  diet,

  countries,
  types,
  diets,

  onCountryChange,
  onTypeChange,
  onDietChange,
}: LibraryFiltersProps) {
  return (
    <div className="relative flex flex-wrap gap-4 mb-8 p-5 rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-sm overflow-hidden">

      {/* animated glow background */}
      <div className="absolute -top-10 left-10 w-40 h-40 bg-emerald-300/20 blur-3xl rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute -bottom-10 right-10 w-40 h-40 bg-green-300/20 blur-3xl rounded-full animate-pulse pointer-events-none"></div>

      {/* Country Filter */}
      <div className="relative group">
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          className="relative z-10 border border-gray-200 rounded-xl px-4 py-2 bg-white text-gray-700 
          focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300
          group-hover:-translate-y-0.5 group-hover:shadow-md"
        >
          <option value="">All Countries</option>

          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* hover glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-emerald-400/10 to-green-400/10 blur-sm"></div>
      </div>

      {/* Type Filter */}
      <div className="relative group">
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="relative z-10 border border-gray-200 rounded-xl px-4 py-2 bg-white text-gray-700
          focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300
          group-hover:-translate-y-0.5 group-hover:shadow-md"
        >
          <option value="">All Types</option>

          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-emerald-400/10 to-green-400/10 blur-sm"></div>
      </div>

      {/* Diet Filter */}
      <div className="relative group">
        <select
          value={diet}
          onChange={(e) => onDietChange(e.target.value)}
          className="relative z-10 border border-gray-200 rounded-xl px-4 py-2 bg-white text-gray-700
          focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300
          group-hover:-translate-y-0.5 group-hover:shadow-md"
        >
          <option value="">All Diet</option>

          {diets.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-emerald-400/10 to-green-400/10 blur-sm"></div>
      </div>

    </div>
  )
}