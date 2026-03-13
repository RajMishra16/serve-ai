import { NextResponse } from "next/server"
import { getRecipeById } from "@/services/recipe.service"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export async function GET(req: Request) {
  try {

    const authData = await auth()
const userId = authData?.userId ?? new URL(req.url).searchParams.get("userId")

    const url = new URL(req.url)

    // extract id from URL path
    const pathParts = url.pathname.split("/")
    const recipeId = pathParts[pathParts.length - 1]

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
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

export async function DELETE(req: Request) {
  try {

    const authData = await auth()
const userId = authData?.userId ?? new URL(req.url).searchParams.get("userId")

    const url = new URL(req.url)

    const pathParts = url.pathname.split("/")
    const recipeId = pathParts[pathParts.length - 1]

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!recipeId) {
      return NextResponse.json(
        { success: false, error: "recipeId required" },
        { status: 400 }
      )
    }

    const query = `
      DELETE FROM recipe_history
      WHERE id = ? AND user_id = ?
    `

    await db.execute(query, [recipeId, userId])

    return NextResponse.json({
      success: true,
      message: "Recipe deleted"
    })

  } catch (error) {

    return NextResponse.json(
      { success: false, error: "Failed to delete recipe" },
      { status: 500 }
    )

  }
}