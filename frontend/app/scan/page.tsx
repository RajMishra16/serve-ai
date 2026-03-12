"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import ScanResultCard from "@/components/ScanResultCard";
import PageHeader from "@/components/ui/PageHeader";
import { ScanIngredient } from "@/types/ScanIngredient";

export default function ScanPage() {
  const [ingredients, setIngredients] = useState<ScanIngredient[]>([]);

  return (
    <div className="p-6 space-y-8">

      <PageHeader
        title="Scan Ingredients"
        subtitle="Upload an image to detect ingredients automatically"
      />

      {/* Image Upload */}
      <div className="max-w-xl">
        <ImageUploader onScanComplete={setIngredients} />
      </div>

      {/* Scan Results */}
      {ingredients.length > 0 && (
        <div className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <ScanResultCard key={index} ingredient={ingredient} />
          ))}
        </div>
      )}

    </div>
  );
}