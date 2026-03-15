"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import ScanResultCard from "@/components/ScanResultCard";
import PageHeader from "@/components/ui/PageHeader";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { ScanIngredient } from "@/types/ScanIngredient";

export default function ScanPage() {

  const [ingredients, setIngredients] = useState<ScanIngredient[]>([]);

  return (

    <div className="relative min-h-screen bg-gray-50 overflow-hidden">

      <AnimatedBackground />

      <div className="relative max-w-7xl mx-auto px-6 py-10 space-y-12">

        <PageHeader
          title="Scan Ingredients"
          subtitle="Upload an image to detect ingredients automatically"
        />

        {/* Upload Section */}

        <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm p-8 transition hover:shadow-xl">

          {/* glow effect */}

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-400/10 via-green-400/10 to-lime-400/10 pointer-events-none"></div>

          <div className="relative">
            <ImageUploader onScanComplete={setIngredients} />
          </div>

        </div>


        {/* Results */}

        {ingredients.length > 0 && (

          <div className="space-y-6">

            <h2 className="text-xl font-bold text-gray-900 tracking-wide">
              Detected Ingredients
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

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