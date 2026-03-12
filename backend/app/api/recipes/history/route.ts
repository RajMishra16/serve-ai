import { NextResponse } from "next/server"
import { getRecipeHistory } from "@/services/recipe.service"

export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "userId is required",
        },
        { status: 400 }
      )
    }

    const recipes = await getRecipeHistory(userId)

    return NextResponse.json({
      success: true,
      data: recipes
    })

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch recipe history"
      },
      { status: 500 }
    )

  }
}