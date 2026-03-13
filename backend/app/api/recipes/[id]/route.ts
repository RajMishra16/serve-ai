import { NextResponse } from "next/server"
import { getRecipeById } from "@/services/recipe.service"
import { db } from "@/lib/db"

export async function GET(req: Request) {

  try {

    const url = new URL(req.url)

    const userId = url.searchParams.get("userId")

    const pathParts = url.pathname.split("/")
    const recipeId = pathParts[pathParts.length - 1]

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "userId required"
        },
        { status: 400 }
      )
    }

    if (!recipeId) {
      return NextResponse.json(
        {
          success: false,
          error: "recipeId required"
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

    console.error("GET RECIPE ERROR:", error)

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

    const url = new URL(req.url)

    const userId = url.searchParams.get("userId")

    const pathParts = url.pathname.split("/")
    const recipeId = pathParts[pathParts.length - 1]

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId required" },
        { status: 400 }
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

    console.error("DELETE RECIPE ERROR:", error)

    return NextResponse.json(
      { success: false, error: "Failed to delete recipe" },
      { status: 500 }
    )

  }

}