import { Database, Bookmark } from "lucide-react"

type StatsCardProps = {
  title: string
  value: number
}

export default function StatsCard({ title, value }: StatsCardProps) {

  const icon =
    title === "Pantry Items"
      ? <Database className="w-5 h-5 text-emerald-600" />
      : <Bookmark className="w-5 h-5 text-indigo-600" />

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div className="space-y-2">

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p className="text-3xl font-bold text-gray-900">
            {value}
          </p>

        </div>

        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          {icon}
        </div>

      </div>

    </div>
  )
}