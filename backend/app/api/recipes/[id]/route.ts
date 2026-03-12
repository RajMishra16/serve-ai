import { NextResponse } from "next/server"
import { getRecipeById } from "@/services/recipe.service"

export async function GET(req: Request) {
  try {

    const url = new URL(req.url)

    const userId = url.searchParams.get("userId")

    // extract id from URL path
    const pathParts = url.pathname.split("/")
    const recipeId = pathParts[pathParts.length - 1]

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "userId is required",
        },
        { status: 400 }
      )
    }

    if (!recipeId) {
      return NextResponse.json(
        {
          success: false,
          error: "recipeId is required",
        },
        { status: 400 }
      )
    }

    const recipe = await getRecipeById(userId, recipeId)

    return NextResponse.json({
      success: true,
      data: recipe
    })

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch recipe"
      },
      { status: 500 }
    )

  }
}