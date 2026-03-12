type EmptyStateProps = {
  title: string
  message?: string
}

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">

      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>

      {message && (
        <p className="text-gray-500 mt-2">
          {message}
        </p>
      )}

    </div>
  )
}