export default function SkeletonCard() {

  return (

    <div
      className="
      relative
      bg-white
      border border-gray-200
      rounded-xl
      p-5
      shadow-sm
      overflow-hidden
      "
    >

      {/* Shimmer overlay */}
      <div
        className="
        absolute inset-0
        animate-[shimmer_1.5s_infinite]
        bg-gradient-to-r
        from-transparent
        via-gray-200/40
        to-transparent
        "
      />

      <div className="space-y-4">

        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>

        {/* Subtitle */}
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>

        {/* Meta row */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
        </div>

      </div>

    </div>

  )

}