import { ScanIngredient } from "@/types/ScanIngredient"
import { Sparkles } from "lucide-react"

interface Props {
  ingredient: ScanIngredient
}

export default function ScanResultCard({ ingredient }: Props) {

  const confidence = ingredient.confidence
    ? Math.round(ingredient.confidence * 100)
    : null

  return (

    <div
      className="
      group relative
      bg-white
      border border-gray-200
      rounded-xl
      p-4
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      flex items-center justify-between
      overflow-hidden
      "
    >

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-400/10 via-green-400/10 to-lime-400/10 pointer-events-none"></div>

      <div className="relative flex items-center gap-3">

        {/* Icon */}
        <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition">
          <Sparkles className="w-4 h-4 text-emerald-600" />
        </div>

        {/* Ingredient name */}
        <span className="font-semibold text-gray-900 capitalize group-hover:text-emerald-600 transition">
          {ingredient.name}
        </span>

      </div>

      {/* Confidence */}
      {confidence && (

        <span className="relative text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600 font-medium">
          {confidence}%
        </span>

      )}

      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-green-500 group-hover:w-full transition-all duration-500"></div>

    </div>

  )
}