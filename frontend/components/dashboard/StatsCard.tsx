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
    <div className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* glow overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-emerald-400/10 via-green-400/10 to-lime-400/10"></div>

      {/* radial light */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_70%)]"></div>

      <div className="relative flex items-center justify-between">

        <div className="space-y-2">

          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition">
            {title}
          </p>

          <p className="text-3xl font-bold text-gray-900 group-hover:text-emerald-600 transition-all duration-300">
            {value}
          </p>

        </div>

        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-100 group-hover:scale-110">
          {icon}
        </div>

      </div>

      {/* animated bottom energy bar */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-green-500 group-hover:w-full transition-all duration-500"></div>

    </div>
  )
}