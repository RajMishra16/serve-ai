import { NextResponse } from "next/server"
import { getLibraryRecipeById } from "@/services/library.service"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    const recipeId = params.id

    if (!recipeId) {
      return NextResponse.json(
        {
          success: false,
          error: "recipeId is required",
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

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch recipe"
      },
      { status: 500 }
    )

  }
}