type PageHeaderProps = {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative mb-10 pb-6 border-b border-gray-200">

      {/* Background glow */}
      <div className="absolute -top-10 left-0 w-72 h-32 bg-emerald-100/40 blur-3xl rounded-full pointer-events-none" />

      {/* Title */}
      <h1 className="relative text-4xl font-bold tracking-tight text-gray-900">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="relative mt-2 text-gray-500 text-sm max-w-xl">
          {subtitle}
        </p>
      )}

      {/* Premium gradient accent */}
      <div className="mt-5 h-[2px] w-24 rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-transparent" />

    </div>
  )
}