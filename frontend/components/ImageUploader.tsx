"use client"

import { useState } from "react"
import { scanImage } from "@/services/scan.service"
import { ScanIngredient } from "@/types/ScanIngredient"

interface Props {
  onScanComplete: (ingredients: ScanIngredient[]) => void
}

export default function ImageUploader({ onScanComplete }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = async () => {
      const base64 = reader.result as string
      setPreview(base64)

      try {
        setLoading(true)

        const ingredients = await scanImage(base64)

        onScanComplete(ingredients)
      } catch (error) {
        console.error("Scan failed:", error)
      } finally {
        setLoading(false)
      }
    }

    reader.readAsDataURL(file)
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "250px", borderRadius: "10px" }}
          />
        </div>
      )}

      {loading && <p>Scanning ingredients...</p>}
    </div>
  )
}