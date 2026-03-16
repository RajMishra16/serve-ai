import { db } from "@/lib/db";
import { randomUUID } from "crypto";

type PantryItem = {
  id: string;
  name: string;
  quantity: number;
  confidence: number | null;
  added_via: string | null;
  created_at: Date;
};

export async function getPantryItems(userId: string): Promise<PantryItem[]> {
  try {
    const [rows]: any = await db.query(
      `
      SELECT id, name, quantity, confidence, added_via, created_at
      FROM pantry_items
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );

    const items: PantryItem[] = rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      quantity: Number(row.quantity),
      confidence: row.confidence ?? null,
      added_via: row.added_via ?? null,
      created_at: row.created_at,
    }));

    return items;
  } catch (error) {
    console.error("Error fetching pantry items:", error);
    throw new Error("Failed to fetch pantry items");
  }
}

export async function addPantryItem(
  userId: string,
  item: {
    name: string;
    quantity: number;
    confidence?: number;
    added_via?: string;
  }
): Promise<PantryItem> {
  try {
    const [existing]: any = await db.query(
      `
      SELECT id, quantity
      FROM pantry_items
      WHERE name = ? AND user_id = ?
      `,
      [item.name, userId]
    );

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

      const row = updated[0];

      return {
        id: row.id,
        name: row.name,
        quantity: Number(row.quantity),
        confidence: row.confidence ?? null,
        added_via: row.added_via ?? null,
        created_at: row.created_at,
      };
    }

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

    const row = result[0];

    return {
      id: row.id,
      name: row.name,
      quantity: Number(row.quantity),
      confidence: row.confidence ?? null,
      added_via: row.added_via ?? null,
      created_at: row.created_at,
    };
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

    const fields = [];
    const values: any[] = [];

    if (data.name !== undefined) {
      fields.push("name = ?");
      values.push(data.name);
    }

    if (data.quantity !== undefined) {
      fields.push("quantity = ?");
      values.push(data.quantity);
    }

    if (fields.length === 0) {
      return {
        success: false,
        message: "No fields to update",
      };
    }

    values.push(itemId);

    const [result]: any = await db.query(
      `
      UPDATE pantry_items
      SET ${fields.join(", ")}
      WHERE id = ?
      `,
      values
    );

    if (!result || result.affectedRows === 0) {
      return {
        success: false,
        message: "Pantry item not found",
      };
    }

    const [rows]: any = await db.query(
      `SELECT * FROM pantry_items WHERE id = ?`,
      [itemId]
    );

    return rows[0];

  } catch (error) {
    console.error("DB update error:", error);
    throw error;
  }
}

export async function deletePantryItem(
  userId: string,
  itemId: string
) {
  try {

    const [result]: any = await db.query(
      `DELETE FROM pantry_items WHERE id = ?`,
      [itemId]
    );

    if (!result || result.affectedRows === 0) {
      return {
        success: false,
        message: "Pantry item not found",
      };
    }

    return {
      success: true,
    };

  } catch (error) {
    console.error("DB delete error:", error);
    throw error;
  }
}

/* NEW FUNCTION — Step 1 */
export async function clearPantry(userId: string) {
  try {

    const [result]: any = await db.query(
      `
      DELETE FROM pantry_items
      WHERE user_id = ?
      `,
      [userId]
    );

    return {
      success: true,
      deleted: result.affectedRows,
    };

  } catch (error) {
    console.error("DB clear pantry error:", error);
    throw error;
  }
}