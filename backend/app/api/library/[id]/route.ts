import { NextResponse } from "next/server"
import { getLibraryRecipeById } from "@/services/library.service"

export async function GET(req: Request) {

  try {

    const url = new URL(req.url)

    const pathParts = url.pathname.split("/")
    const recipeId = pathParts[pathParts.length - 1]

    if (!recipeId) {
      return NextResponse.json(
        {
          success: false,
          error: "recipeId is required"
        },
        { status: 400 }
      )
    }

    const recipe = await getLibraryRecipeById(recipeId)

    return NextResponse.json({
      success: true,
      data: recipe
    })

  } catch (error: any) {

    console.error("LIBRARY RECIPE ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch recipe"
      },
      { status: 500 }
    )

  }

}