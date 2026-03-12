export default function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm animate-pulse space-y-3">

      <div className="h-4 bg-gray-200 rounded w-3/4"></div>

      <div className="h-3 bg-gray-200 rounded w-1/2"></div>

      <div className="flex gap-2 pt-2">
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
      </div>

    </div>
  )
}