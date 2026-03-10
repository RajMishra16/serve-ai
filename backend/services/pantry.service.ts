import { db } from "@/lib/db";

export async function getPantryItems(userId: string) {
  try {
    const result = await db.query(
      `
      SELECT id, name, quantity, confidence, added_via, created_at
      FROM pantry_items
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching pantry items:", error);
    throw new Error("Failed to fetch pantry items");
  }
}
export async function addPantryItem(
  userId: string,
  item: { name: string; quantity: string; confidence?: number; added_via?: string }
) {
  try {
    const result = await db.query(
      `
      INSERT INTO pantry_items (name, quantity, confidence, added_via, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, quantity, confidence, added_via, created_at
      `,
      [
        item.name,
        item.quantity,
        item.confidence ?? null,
        item.added_via ?? "manual",
        userId,
      ]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error adding pantry item:", error);
    throw new Error("Failed to add pantry item");
  }
}
export async function updatePantryItem(
  userId: string,
  itemId: string,
  data: { name?: string; quantity?: string }
) {
  try {
    const result = await db.query(
      `
      UPDATE pantry_items
      SET name = COALESCE($1, name),
          quantity = COALESCE($2, quantity)
      WHERE id = $3 AND user_id = $4
      RETURNING id, name, quantity, confidence, added_via, created_at
      `,
      [data.name ?? null, data.quantity ?? null, itemId, userId]
    );

    if (result.rows.length === 0) {
      throw new Error("Pantry item not found");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error updating pantry item:", error);
    throw new Error("Failed to update pantry item");
  }
}
export async function deletePantryItem(userId: string, itemId: string) {
  try {
    const result = await db.query(
      `
      DELETE FROM pantry_items
      WHERE id = $1 AND user_id = $2
      RETURNING id
      `,
      [itemId, userId]
    );

    if (result.rows.length === 0) {
      throw new Error("Pantry item not found");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting pantry item:", error);
    throw new Error("Failed to delete pantry item");
  }
}