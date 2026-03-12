import { ScanIngredient } from "@/types/ScanIngredient"
import { Sparkles } from "lucide-react"

interface Props {
  ingredient: ScanIngredient
}

export default function ScanResultCard({ ingredient }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-emerald-600" />
        </div>

        <span className="font-medium text-gray-900 capitalize">
          {ingredient.name}
        </span>

      </div>

      {ingredient.confidence && (
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
          {(ingredient.confidence * 100).toFixed(0)}%
        </span>
      )}

    </div>
  )
}