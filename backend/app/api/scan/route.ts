import { NextResponse } from "next/server"
import { detectIngredientsAI } from "@/services/ai.service"
import { addPantryItem } from "@/services/pantry.service"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { imageBase64, userId } = body

    // 1️⃣ Validate input
    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: "imageBase64 is required" },
        { status: 400 }
      )
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      )
    }

    // 2️⃣ AI Detection (SAFE)
    let ingredients: string[] = []

    try {
      ingredients = await detectIngredientsAI(imageBase64)
    } catch (err) {
      console.error("AI ERROR:", err)

      return NextResponse.json(
        { success: false, error: "AI detection failed" },
        { status: 500 }
      )
    }

    // 3️⃣ Save to pantry (SAFE LOOP)
    for (const ingredient of ingredients) {
      try {
        await addPantryItem(userId, {
          name: ingredient,
          quantity: 1,
          added_via: "scan"
        })
      } catch (err) {
        console.error("PANTRY SAVE ERROR:", ingredient)
      }
    }

    // 4️⃣ Response
    return NextResponse.json({
      success: true,
      data: ingredients
    })

  } catch (error: any) {
    console.error("SCAN ROUTE ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to scan ingredients"
      },
      { status: 500 }
    )
  }
}