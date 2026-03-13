"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { scanImage } from "@/services/scan.service"
import { ScanIngredient } from "@/types/ScanIngredient"
import { Upload, Camera } from "lucide-react"

interface Props {
  onScanComplete: (ingredients: ScanIngredient[]) => void
}

export default function ImageUploader({ onScanComplete }: Props) {

  const { user, isLoaded } = useUser()

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

        if (!isLoaded || !user) {
          console.error("User not loaded yet")
          return
        }

        setLoading(true)

        const ingredients = await scanImage(base64, user.id)

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
    <div className="space-y-4">

      {/* Upload Card */}
      <label className="flex flex-col items-center justify-center gap-3 p-10 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer">

        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
          <Camera className="w-5 h-5 text-gray-600" />
        </div>

        <p className="text-sm text-gray-700 font-medium">
          Click to upload an ingredient image
        </p>

        <p className="text-xs text-gray-400">
          JPG, PNG supported
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

      </label>

      {/* Image Preview */}
      {preview && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-64 object-contain rounded-lg"
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <Upload className="w-4 h-4 animate-pulse" />
          Scanning ingredients...
        </div>
      )}

    </div>
  )
}