import { NextResponse } from "next/server"
import { generateRecipesFromPantry } from "@/services/recipe.service"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "userId is required",
        },
        { status: 400 }
      )
    }

    const recipes = await generateRecipesFromPantry(userId)

    return NextResponse.json({
      success: true,
      data: recipes,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate recipes",
      },
      { status: 500 }
    )
  }
}