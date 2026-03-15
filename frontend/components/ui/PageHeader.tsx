type PageHeaderProps = {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative mb-12 pb-8 border-b border-gray-200 overflow-hidden">

      {/* background glow layer 1 */}
      <div className="absolute -top-12 left-0 w-80 h-40 bg-emerald-300/30 blur-3xl rounded-full pointer-events-none animate-pulse" />

      {/* background glow layer 2 */}
      <div className="absolute -top-10 left-1/3 w-96 h-48 bg-green-200/30 blur-3xl rounded-full pointer-events-none animate-pulse" />

      {/* background glow layer 3 */}
      <div className="absolute -top-8 right-0 w-72 h-36 bg-lime-200/30 blur-3xl rounded-full pointer-events-none animate-pulse" />

      {/* floating particle lights */}
      <div className="absolute top-2 left-1/4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 animate-ping" />
      <div className="absolute top-10 left-1/2 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-ping" />
      <div className="absolute top-6 right-1/3 w-2 h-2 bg-lime-400 rounded-full opacity-60 animate-ping" />

      {/* Title */}
      <h1 className="relative text-4xl font-bold tracking-tight leading-tight">

        {/* animated gradient text */}
        <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradient_6s_ease_infinite]">
          {title}
        </span>

        {/* shimmer sweep */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 hover:opacity-100 blur-sm transition duration-700"></span>

      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="relative mt-3 text-gray-500 text-sm max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* animated accent line */}
      <div className="mt-6 relative h-[3px] w-32 overflow-hidden rounded-full bg-gray-100">

        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-400 to-lime-400 animate-[slide_4s_linear_infinite]" />

      </div>

    </div>
  )
}