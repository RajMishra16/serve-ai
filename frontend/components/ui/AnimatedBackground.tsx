"use client"

import { useEffect, useState, useRef } from "react"
import {
Apple,
Carrot,
Pizza,
Fish,
Cookie,
ChefHat,
Utensils
} from "lucide-react"

/* ============================ */
/* CURSOR TRAIL */
/* ============================ */

function CursorTrail() {

const container = useRef<HTMLDivElement>(null)

useEffect(() => {

const move = (e: MouseEvent) => {

  const dot = document.createElement("div")

  dot.className =
    "fixed w-2 h-2 bg-emerald-400 rounded-full blur-sm pointer-events-none"

  dot.style.left = `${e.clientX}px`
  dot.style.top = `${e.clientY}px`

  container.current?.appendChild(dot)

  setTimeout(() => dot.remove(), 500)

}

window.addEventListener("mousemove", move)

return () => window.removeEventListener("mousemove", move)


}, [])

return <div ref={container} />
}

/* ============================ */
/* SPOTLIGHT */
/* ============================ */

function Spotlight() {

const [pos, setPos] = useState({ x: 0, y: 0 })

useEffect(() => {

const move = (e: MouseEvent) => {
  setPos({ x: e.clientX, y: e.clientY })
}

window.addEventListener("mousemove", move)

return () => window.removeEventListener("mousemove", move)


}, [])

return (
<div
className="pointer-events-none fixed inset-0"
style={{
background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgba(16,185,129,0.15), transparent 70%)`
}}
/>
)
}

/* ============================ */
/* PARTICLES */
/* ============================ */

function Particles() {

const [items, setItems] = useState<any[]>([])

useEffect(() => {


const generated = Array.from({ length: 35 }).map(() => ({
  width: 60 + Math.random() * 120,
  height: 60 + Math.random() * 120,
  left: Math.random() * 100,
  top: Math.random() * 100
}))

setItems(generated)


}, [])

return (


<div className="absolute inset-0 pointer-events-none">

  {items.map((p, i) => (

    <div
      key={i}
      className="absolute bg-emerald-300/20 rounded-full blur-3xl animate-pulse"
      style={{
        width: `${p.width}px`,
        height: `${p.height}px`,
        left: `${p.left}%`,
        top: `${p.top}%`
      }}
    />

  ))}

</div>


)
}

/* ============================ */
/* INGREDIENT RAIN */
/* ============================ */

function IngredientRain() {

const [items, setItems] = useState<any[]>([])

const icons = [Apple, Carrot, Pizza, Fish, Cookie]

useEffect(() => {


const generated = Array.from({ length: 14 }).map((_, i) => ({
  icon: icons[i % icons.length],
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 30 + Math.random() * 40
}))

setItems(generated)


}, [])

return (


<div className="absolute inset-0 pointer-events-none">

  {items.map((item, i) => {

    const Icon = item.icon

    return (

      <Icon
        key={i}
        className="absolute text-emerald-300/40 animate-bounce"
        style={{
          left: `${item.left}%`,
          top: `${item.top}%`,
          fontSize: `${item.size}px`
        }}
      />

    )

  })}

</div>


)
}

/* ============================ */
/* FLOATING ICONS */
/* ============================ */

function FloatingIcons() {

return (


<>
  <ChefHat className="absolute top-40 left-20 text-emerald-400 animate-bounce" />
  <Utensils className="absolute bottom-20 right-32 text-green-400 animate-bounce" />
</>


)
}

/* ============================ */
/* MAIN COMPONENT */
/* ============================ */

export default function AnimatedBackground() {

return (


<>
  <CursorTrail />
  <Spotlight />
  <Particles />
  <IngredientRain />
  <FloatingIcons />
</>


)
}
