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
      <div className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">

        <div className="flex items-start justify-between">

          <div className="space-y-2">

            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed">
              {description}
            </p>

          </div>

          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition" />

        </div>

      </div>
    </Link>
  )
}