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
    <div className="flex flex-wrap gap-4 mb-6">

      {/* Country Filter */}
      <select
        value={country}
        onChange={(e) => onCountryChange(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">All Countries</option>

        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}

      </select>

      {/* Type Filter */}
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">All Types</option>

        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}

      </select>

      {/* Diet Filter */}
      <select
        value={diet}
        onChange={(e) => onDietChange(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">All Diet</option>

        {diets.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}

      </select>

    </div>
  )
}