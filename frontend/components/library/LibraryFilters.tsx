type LibraryFiltersProps = {
  country: string
  type: string
  diet: string
  onCountryChange: (value: string) => void
  onTypeChange: (value: string) => void
  onDietChange: (value: string) => void
}

export default function LibraryFilters({
  country,
  type,
  diet,
  onCountryChange,
  onTypeChange,
  onDietChange,
}: LibraryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">

      <select
        value={country}
        onChange={(e) => onCountryChange(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">All Countries</option>
        <option value="India">India</option>
        <option value="Italy">Italy</option>
        <option value="China">China</option>
      </select>

      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">All Types</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>

      <select
        value={diet}
        onChange={(e) => onDietChange(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">All Diet</option>
        <option value="Veg">Veg</option>
        <option value="Non-Veg">Non-Veg</option>
      </select>

    </div>
  )
}