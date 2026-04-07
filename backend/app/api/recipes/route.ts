import { NextResponse } from "next/server";
import { getLibraryRecipes } from "@/services/library.service";

export async function GET() {
  try {
    const recipes = await getLibraryRecipes();

    const res = NextResponse.json({
      success: true,
      data: recipes,
    });

    // ✅ Allow both local + production frontend
    const allowedOrigin =
      process.env.NODE_ENV === "production"
        ? "https://serve-ai-five.vercel.app"
        : "http://localhost:3000";

    res.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PATCH,DELETE,OPTIONS"
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return res;
  } catch (error: any) {
    const res = NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch library recipes",
      },
      { status: 500 }
    );

    const allowedOrigin =
      process.env.NODE_ENV === "production"
        ? "https://serve-ai-five.vercel.app"
        : "http://localhost:3000";

    res.headers.set("Access-Control-Allow-Origin", allowedOrigin);

    return res;
  }
}