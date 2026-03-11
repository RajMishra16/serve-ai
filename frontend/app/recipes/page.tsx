"use client"

import { useState } from "react"
import { generateRecipes, Recipe } from "@/services/receipe.service"

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)

  const handleGenerateRecipes = async () => {
    try {
      setLoading(true)

      const data = await generateRecipes()

      setRecipes(data)
    } catch (error) {
      console.error("Failed to generate recipes:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>AI Recipe Generator</h1>

      <button
        onClick={handleGenerateRecipes}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Generate Recipes
      </button>

      {loading && <p>Generating recipes...</p>}

      {recipes.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          {recipes.map((recipe) => (
  <div
    key={recipe.id}
    style={{
      border: "1px solid #e5e5e5",
      padding: "25px",
      borderRadius: "12px",
      marginBottom: "25px",
      background: "#ffffff",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    }}
  >
              <h2 style={{ marginBottom: "10px", color: "#222" }}>{recipe.title}</h2>

              <p>
                <strong>Cook Time:</strong> {recipe.cookTime} minutes
              </p>

              <p>
                <strong>Difficulty:</strong> {recipe.difficulty}
              </p>

              <h3 style={{ marginTop: "15px" }}>Ingredients</h3>
              <ul>
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 style={{ marginTop: "15px" }}>Steps</h3>
              <ol>
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}