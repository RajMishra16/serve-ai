import { NextResponse } from "next/server";
import { getPantryItems, addPantryItem } from "@/services/pantry.service";
import { z } from "zod";

const pantrySchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(1),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId missing" },
        { status: 400 }
      );
    }

    const items = await getPantryItems(userId);

    return NextResponse.json({
      success: true,
      data: items ?? [],
    });
  } catch (error: any) {
    console.error("PANTRY GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch pantry items",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = pantrySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid ingredient data" },
        { status: 400 }
      );
    }

    const { name, quantity, userId } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId missing" },
        { status: 400 }
      );
    }

    const newItem = await addPantryItem(userId, {
      name,
      quantity,
    });

    return NextResponse.json({
      success: true,
      data: newItem,
    });
  } catch (error: any) {
    console.error("PANTRY POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to add pantry item",
      },
      { status: 500 }
    );
  }
}