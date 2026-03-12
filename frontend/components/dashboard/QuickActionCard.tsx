import Link from "next/link"

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
      <div className="border rounded-xl p-6 hover:shadow-md transition cursor-pointer bg-white">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        <p className="text-gray-500 mt-2 text-sm">{description}</p>
      </div>
    </Link>
  )
}