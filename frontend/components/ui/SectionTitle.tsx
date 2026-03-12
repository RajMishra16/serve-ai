type SectionTitleProps = {
  title: string
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      {title}
    </h2>
  )
}