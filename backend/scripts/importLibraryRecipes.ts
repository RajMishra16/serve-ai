import fs from "fs";
import path from "path";

async function importRecipes() {
  try {

    // dynamic import to avoid ts-node module resolution issues
    const { db } = await import("../lib/db");

    const filePath = path.join(process.cwd(), "data", "libraryRecipes.json");

    const file = fs.readFileSync(filePath, "utf-8");
    const recipes = JSON.parse(file);

    for (const recipe of recipes) {

      const query = `
        INSERT INTO recipe_library (
          id,
          title,
          image,
          country,
          type,
          diet,
          ingredients,
          steps,
          cook_time,
          difficulty
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

        ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        image = VALUES(image),
        country = VALUES(country),
        type = VALUES(type),
        diet = VALUES(diet),
        ingredients = VALUES(ingredients),
        steps = VALUES(steps),
        cook_time = VALUES(cook_time),
        difficulty = VALUES(difficulty)
      `;

      await db.execute(query, [
        recipe.id,
        recipe.title,
        recipe.image,
        recipe.country,
        recipe.type,
        recipe.diet,
        JSON.stringify(recipe.ingredients),
        JSON.stringify(recipe.steps),
        recipe.cook_time,
        recipe.difficulty
      ]);

      console.log("Upserted:", recipe.title);
    }

    console.log("All recipes imported successfully");
    process.exit(0);

  } catch (error) {
    console.error("Import failed:", error);
    process.exit(1);
  }
}

importRecipes();