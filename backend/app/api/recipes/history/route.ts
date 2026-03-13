import { NextResponse } from "next/server"
import { getRecipeHistory } from "@/services/recipe.service"
import { auth } from "@clerk/nextjs/server"

export async function GET(req: Request) {
  try {

    const authData = await auth()
    const finalUserId = authData?.userId ?? "test-user"

    const recipes = await getRecipeHistory(finalUserId)

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