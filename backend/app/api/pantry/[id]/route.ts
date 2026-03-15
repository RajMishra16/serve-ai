import { NextResponse } from "next/server";
import { updatePantryItem, deletePantryItem } from "@/services/pantry.service";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  quantity: z.number().min(1).optional(),
});

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();

    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid update data",
        },
        { status: 400 }
      );
    }

    const { id } = await context.params;

    // TEMP user id until Clerk auth is connected
    const userId = "test-user";

    const updatedItem = await updatePantryItem(userId, id, parsed.data);

    return NextResponse.json({
      success: true,
      data: updatedItem,
    });

  } catch (error) {
    console.error("Error updating pantry item:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update pantry item",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "UserId is required" },
        { status: 400 }
      );
    }

    await deletePantryItem(userId, id);

    return NextResponse.json({
      success: true,
      message: "Pantry item deleted successfully",
    });

  } catch (error) {
    console.error("DELETE pantry error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to delete pantry item" },
      { status: 500 }
    );
  }
}