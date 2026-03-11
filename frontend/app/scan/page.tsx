"use client"

import { useState } from "react"
import ImageUploader from "@/components/ImageUploader"
import ScanResultCard from "@/components/ScanResultCard"
import { ScanIngredient } from "@/types/ScanIngredient"

export default function ScanPage() {
  const [ingredients, setIngredients] = useState<ScanIngredient[]>([])

  const handleScanComplete = (data: ScanIngredient[]) => {
    setIngredients(data)
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>AI Ingredient Scanner</h1>

      <p>Upload an image of your fridge or ingredients.</p>

      <ImageUploader onScanComplete={handleScanComplete} />

      {ingredients.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Detected Ingredients</h2>

          {ingredients.map((ingredient, index) => (
            <ScanResultCard key={index} ingredient={ingredient} />
          ))}

          <p style={{ marginTop: "20px", color: "green" }}>
            Pantry updated automatically ✔
          </p>
        </div>
      )}
    </div>
  )
}