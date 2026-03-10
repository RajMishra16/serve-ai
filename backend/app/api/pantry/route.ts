import { NextResponse } from "next/server";
import { getPantryItems, addPantryItem } from "@/services/pantry.service";
import { z } from "zod";

/*
Request validation schema
*/
const pantrySchema = z.object({
  name: z.string().min(1),
  quantity: z.string().min(1),
});

/*
GET /api/pantry
Fetch all pantry items for a user
*/
export async function GET() {
  try {
    // TEMP user id until Clerk auth is connected
    const userId = "test-user";

    const items = await getPantryItems(userId);

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching pantry:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch pantry items",
      },
      { status: 500 }
    );
  }
}

/*
POST /api/pantry
Add new pantry item
*/
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = pantrySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid ingredient data",
        },
        { status: 400 }
      );
    }

    const { name, quantity } = parsed.data;

    // TEMP user id until Clerk auth is connected
    const userId = "test-user";

    const newItem = await addPantryItem(userId, {
      name,
      quantity,
    });

    return NextResponse.json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    console.error("Error adding pantry item:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to add pantry item",
      },
      { status: 500 }
    );
  }
}