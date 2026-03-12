type StatsCardProps = {
  title: string
  value: number
}

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <p className="text-2xl font-bold text-gray-900 mt-2">
        {value}
      </p>

    </div>
  )
}