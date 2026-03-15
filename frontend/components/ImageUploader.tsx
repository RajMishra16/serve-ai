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

    <div className="space-y-6">

      {/* Upload Card */}
      <label
        className="
        group relative flex flex-col items-center justify-center gap-4
        p-12
        border-2 border-dashed border-gray-300
        rounded-2xl
        bg-gray-50
        hover:bg-gray-100
        hover:border-emerald-400
        transition
        cursor-pointer
        overflow-hidden
        "
      >

        {/* Glow hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-400/10 via-green-400/10 to-lime-400/10 pointer-events-none"></div>

        <div className="relative w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition">
          <Camera className="w-6 h-6 text-gray-600" />
        </div>

        <p className="relative text-sm text-gray-700 font-semibold">
          Click to upload an ingredient image
        </p>

        <p className="relative text-xs text-gray-400">
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

        <div className="relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm overflow-hidden">

          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-72 object-contain rounded-lg"
          />

          {/* subtle bottom glow */}
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-emerald-400 to-green-500 opacity-40"></div>

        </div>

      )}

      {/* Loading */}
      {loading && (

        <div className="flex items-center gap-3 text-sm text-gray-600">

          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>

          <span className="font-medium">
            Scanning ingredients with AI...
          </span>

        </div>

      )}

    </div>

  )

}