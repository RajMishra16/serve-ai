import { ScanIngredient } from "@/types/ScanIngredient"

interface Props {
  ingredient: ScanIngredient
}

export default function ScanResultCard({ ingredient }: Props) {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "10px",
        background: "#fafafa",
      }}
    >
      <strong>{ingredient.name}</strong>

      {ingredient.confidence && (
        <p style={{ fontSize: "12px", color: "#666" }}>
          Confidence: {(ingredient.confidence * 100).toFixed(0)}%
        </p>
      )}
    </div>
  )
}