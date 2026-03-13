import { NextResponse } from "next/server";
import { getPantryItems, addPantryItem } from "@/services/pantry.service";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const pantrySchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(1),
});

export async function GET() {
  try {
    const authData = await auth();
    const finalUserId = authData?.userId ?? "test-user";

    const items = await getPantryItems(finalUserId);

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("Pantry GET error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch pantry items" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const authData = await auth();
    const finalUserId = authData?.userId ?? "test-user";

    const body = await req.json();

    const parsed = pantrySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid ingredient data" },
        { status: 400 }
      );
    }

    const { name, quantity } = parsed.data;

    const newItem = await addPantryItem(finalUserId, {
      name,
      quantity,
    });

    return NextResponse.json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    console.error("Pantry POST error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to add pantry item" },
      { status: 500 }
    );
  }
}