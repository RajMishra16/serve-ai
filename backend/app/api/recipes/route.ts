import { NextResponse } from "next/server"
import { getLibraryRecipes } from "@/services/library.service"

export async function GET() {
  try {

    const recipes = await getLibraryRecipes()

    const res = NextResponse.json({
      success: true,
      data: recipes
    })

    res.headers.set("Access-Control-Allow-Origin", "http://localhost:3000")
    res.headers.set("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS")
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    return res

  } catch (error: any) {

    const res = NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch library recipes"
      },
      { status: 500 }
    )

    res.headers.set("Access-Control-Allow-Origin", "http://localhost:3000")

    return res
  }
}