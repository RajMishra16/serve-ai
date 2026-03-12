import { NextResponse } from "next/server"
import { getLibraryRecipes } from "@/services/library.service"

export async function GET() {
  try {

    const recipes = await getLibraryRecipes()

    return NextResponse.json({
      success: true,
      data: recipes
    })

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch library recipes"
      },
      { status: 500 }
    )

  }
}