import { NextResponse } from "next/server"
import { getRecipeHistory } from "@/services/recipe.service"

export async function GET(req: Request) {
  try {

    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "userId missing"
        },
        { status: 400 }
      )
    }

    const recipes = await getRecipeHistory(userId)

    return NextResponse.json({
      success: true,
      data: recipes ?? []
    })

  } catch (error: any) {

    console.error("RECIPE HISTORY ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch recipe history"
      },
      { status: 500 }
    )

  }
}