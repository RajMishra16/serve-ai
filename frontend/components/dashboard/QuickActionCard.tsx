import Link from "next/link"
import { ArrowRight } from "lucide-react"

type QuickActionCardProps = {
  title: string
  description: string
  href: string
}

export default function QuickActionCard({
  title,
  description,
  href,
}: QuickActionCardProps) {
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl">

        {/* Animated gradient glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-emerald-400/10 via-green-400/10 to-lime-400/10"></div>

        {/* Mouse light effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]"></div>

        <div className="relative flex items-start justify-between">

          <div className="space-y-2">

            <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-emerald-600">
              {title}
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-600 transition">
              {description}
            </p>

          </div>

          <ArrowRight className="w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-emerald-600 group-hover:translate-x-1 group-hover:scale-110" />

        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-green-500 group-hover:w-full transition-all duration-500"></div>

      </div>
    </Link>
  )
}