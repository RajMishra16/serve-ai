import { db } from "@/lib/db";
import { randomUUID } from "crypto";

export async function getPantryItems(userId: string) {
  try {
    const [rows] = await db.query(
      `
      SELECT id, name, quantity, confidence, added_via, created_at
      FROM pantry_items
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return rows;
  } catch (error) {
    console.error("Error fetching pantry items:", error);
    throw new Error("Failed to fetch pantry items");
  }
}

export async function addPantryItem(
  userId: string,
  item: { name: string; quantity: number; confidence?: number; added_via?: string }
) {
  try {
    // Check if item already exists
    const [existing]: any = await db.query(
      `
      SELECT id, quantity
      FROM pantry_items
      WHERE name = ? AND user_id = ?
      `,
      [item.name, userId]
    );

    // If exists → update quantity
    if (existing.length > 0) {
      const newQuantity =
        Number(existing[0].quantity) + Number(item.quantity);

      await db.query(
        `
        UPDATE pantry_items
        SET quantity = ?
        WHERE id = ?
        `,
        [newQuantity, existing[0].id]
      );

      const [updated]: any = await db.query(
        `
        SELECT id, name, quantity, confidence, added_via, created_at
        FROM pantry_items
        WHERE id = ?
        `,
        [existing[0].id]
      );

      return updated[0];
    }

    // Otherwise insert new item
    const id = randomUUID();

    await db.query(
      `
      INSERT INTO pantry_items (id, name, quantity, confidence, added_via, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        item.name,
        item.quantity,
        item.confidence ?? null,
        item.added_via ?? "manual",
        userId,
      ]
    );

    const [result]: any = await db.query(
      `
      SELECT id, name, quantity, confidence, added_via, created_at
      FROM pantry_items
      WHERE id = ?
      `,
      [id]
    );

    return result[0];
  } catch (error) {
    console.error("Error adding pantry item:", error);
    throw new Error("Failed to add pantry item");
  }
}

export async function updatePantryItem(
  userId: string,
  itemId: string,
  data: { name?: string; quantity?: number }
) {
  try {
    await db.query(
      `
      UPDATE pantry_items
      SET
        name = COALESCE(?, name),
        quantity = COALESCE(?, quantity)
      WHERE id = ? AND user_id = ?
      `,
      [data.name ?? null, data.quantity ?? null, itemId, userId]
    );

    const [rows]: any = await db.query(
      `
      SELECT id, name, quantity, confidence, added_via, created_at
      FROM pantry_items
      WHERE id = ? AND user_id = ?
      `,
      [itemId, userId]
    );

    if (rows.length === 0) {
      throw new Error("Pantry item not found");
    }

    return rows[0];
  } catch (error) {
    console.error("Error updating pantry item:", error);
    throw new Error("Failed to update pantry item");
  }
}

export async function deletePantryItem(userId: string, itemId: string) {
  try {
    const [result]: any = await db.query(
      `
      DELETE FROM pantry_items
      WHERE id = ? AND user_id = ?
      `,
      [itemId, userId]
    );

    if (result.affectedRows === 0) {
      throw new Error("Pantry item not found");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting pantry item:", error);
    throw new Error("Failed to delete pantry item");
  }
}