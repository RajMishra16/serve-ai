"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import ScanResultCard from "@/components/ScanResultCard";
import PageHeader from "@/components/ui/PageHeader";
import { ScanIngredient } from "@/types/ScanIngredient";

export default function ScanPage() {

  const [ingredients, setIngredients] = useState<ScanIngredient[]>([]);

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">

        <PageHeader
          title="Scan Ingredients"
          subtitle="Upload an image to detect ingredients automatically"
        />

        {/* Upload Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

          <ImageUploader onScanComplete={setIngredients} />

        </div>

        {/* Results */}
        {ingredients.length > 0 && (

          <div className="space-y-4">

            <h2 className="text-lg font-semibold text-gray-800">
              Detected Ingredients
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {ingredients.map((ingredient, index) => (
                <ScanResultCard
                  key={index}
                  ingredient={ingredient}
                />
              ))}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}