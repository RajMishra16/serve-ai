import {
  Apple,
  Carrot,
  Egg,
  Cherry,
  Sandwich,
  Pizza,
  Coffee,
  IceCream,
} from "lucide-react"

export const getIngredientIcon = (name: string) => {
  const item = name.toLowerCase()

  // Lucide icons
  if (item.includes("apple")) return Apple
  if (item.includes("carrot")) return Carrot
  if (item.includes("egg")) return Egg
  if (item.includes("cherry")) return Cherry
  if (item.includes("sandwich")) return Sandwich
  if (item.includes("pizza")) return Pizza
  if (item.includes("coffee")) return Coffee
  if (item.includes("ice cream")) return IceCream

  // Emoji fallback
  if (item.includes("banana")) return "🍌"
  if (item.includes("bread")) return "🍞"
  if (item.includes("rice")) return "🍚"
  if (item.includes("milk")) return "🥛"
  if (item.includes("cheese")) return "🧀"
  if (item.includes("chicken")) return "🍗"
  if (item.includes("tomato")) return "🍅"
  if (item.includes("potato")) return "🥔"
  if (item.includes("onion")) return "🧅"
  if (item.includes("fish")) return "🐟"

  return "🍽️"
}