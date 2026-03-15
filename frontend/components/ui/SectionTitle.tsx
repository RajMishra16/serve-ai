type SectionTitleProps = {
  title: string
  subtitle?: string
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {

  return (

    <div className="space-y-2 mb-6">

      <div className="flex items-center gap-3">

        {/* Accent line */}
        <div className="w-1.5 h-6 rounded bg-emerald-500"></div>

        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
          {title}
        </h2>

      </div>

      {subtitle && (
        <p className="text-sm text-gray-500 ml-[14px]">
          {subtitle}
        </p>
      )}

    </div>

  )

}