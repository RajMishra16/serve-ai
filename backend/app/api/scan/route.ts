import { NextResponse } from "next/server"
import { detectIngredientsAI } from "@/services/ai.service"
import { addPantryItem } from "@/services/pantry.service"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { imageBase64 } = body

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: "imageBase64 is required" },
        { status: 400 }
      )
    }

    const ingredients = await detectIngredientsAI(imageBase64)

    // Save scanned ingredients to pantry
    for (const ingredient of ingredients) {
      await addPantryItem("test-user", {
        name: ingredient,
        quantity: 1,
        added_via: "scan"
      })
    }

    return NextResponse.json({
      success: true,
      data: ingredients
    })

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to scan ingredients" },
      { status: 500 }
    )
  }
}