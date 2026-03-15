"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Camera,
  ChefHat,
  Box,
  Sparkles,
  Brain,
  Utensils,
  Scan,
  Wand2,
  Apple,
  Carrot,
  Pizza,
  Fish,
  Cookie
} from "lucide-react";

/* ================================================= */
/* TYPEWRITER */
/* ================================================= */

function useTypewriter(phrases: string[]) {

  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {

    const timeout = setTimeout(() => {

      const phrase = phrases[phraseIndex];

      if (charIndex < phrase.length) {

        setText((prev) => prev + phrase[charIndex]);
        setCharIndex(charIndex + 1);

      } else {

        setTimeout(() => {

          setText("");
          setCharIndex(0);
          setPhraseIndex((p) => (p + 1) % phrases.length);

        }, 1800);

      }

    }, 45);

    return () => clearTimeout(timeout);

  }, [charIndex, phraseIndex]);

  return text;
}

/* ================================================= */
/* SCROLL PROGRESS BAR */
/* ================================================= */

function ScrollBar() {

  const [progress, setProgress] = useState(0);

  useEffect(() => {

    const handleScroll = () => {

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = window.scrollY;

      setProgress((scrolled / height) * 100);

    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-emerald-500 z-50"
      style={{ width: `${progress}%` }}
    />
  );
}

/* ================================================= */
/* CURSOR TRAIL */
/* ================================================= */

function CursorTrail() {

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const move = (e: MouseEvent) => {

      const dot = document.createElement("div");

      dot.className =
        "fixed w-2 h-2 bg-emerald-400 rounded-full blur-sm pointer-events-none";

      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      container.current?.appendChild(dot);

      setTimeout(() => dot.remove(), 500);

    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);

  }, []);

  return <div ref={container} />;
}

/* ================================================= */
/* SPOTLIGHT EFFECT */
/* ================================================= */

function Spotlight() {

  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);

  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{
        background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgba(16,185,129,0.15), transparent 70%)`
      }}
    />
  );
}

/* ================================================= */
/* BACKGROUND PARTICLES */
/* ================================================= */

function Particles() {

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {

    const generated = Array.from({ length: 35 }).map(() => ({
      width: 60 + Math.random() * 120,
      height: 60 + Math.random() * 120,
      left: Math.random() * 100,
      top: Math.random() * 100
    }));

    setItems(generated);

  }, []);

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

  );
}

/* ================================================= */
/* INGREDIENT RAIN */
/* ================================================= */

function IngredientRain() {

  const [items, setItems] = useState<any[]>([]);
  const icons = [Apple, Carrot, Pizza, Fish, Cookie];

  useEffect(() => {

    const generated = Array.from({ length: 14 }).map((_, i) => ({
      icon: icons[i % icons.length],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 30 + Math.random() * 40
    }));

    setItems(generated);

  }, []);

  return (

    <div className="absolute inset-0 pointer-events-none">

      {items.map((item, i) => {

        const Icon = item.icon;

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

        );

      })}

    </div>

  );
}

/* ================================================= */
/* COUNTER */
/* ================================================= */

function useCounter(target: number) {

  const [count, setCount] = useState(0);

  useEffect(() => {

    let start = 0;

    const interval = setInterval(() => {

      start += Math.ceil(target / 60);

      if (start >= target) {

        setCount(target);
        clearInterval(interval);

      } else {

        setCount(start);

      }

    }, 25);

    return () => clearInterval(interval);

  }, []);

  return count;
}

/* ================================================= */
/* STAT CARD */
/* ================================================= */

function StatCard({ target, label }: any) {

  const count = useCounter(target);

  return (

    <div className="bg-white border border-gray-200 rounded-xl p-10 shadow-md hover:shadow-xl transition">

      <h3 className="text-4xl font-bold text-emerald-600">
        {count.toLocaleString()}+
      </h3>

      <p className="text-gray-600 mt-2">{label}</p>

    </div>

  );
}

/* ================================================= */
/* FEATURE CARD */
/* ================================================= */

function FeatureCard({ icon, title, description }: any) {

  const ref = useRef<HTMLDivElement>(null);

  const move = (e: any) => {

    const rect = ref.current!.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 10;
    const rotateY = (x - rect.width / 2) / 10;

    ref.current!.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  };

  const leave = () => {
    ref.current!.style.transform = "rotateX(0) rotateY(0)";
  };

  return (

    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-transform duration-200"
      style={{ transformStyle: "preserve-3d" }}
    >

      <div className="flex flex-col items-center text-center gap-4">

        <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          {icon}
        </div>

        <h3 className="font-semibold text-lg">{title}</h3>

        <p className="text-gray-600 text-sm">{description}</p>

      </div>

    </div>

  );
}

/* ================================================= */
/* STEP CARD */
/* ================================================= */

function StepCard({ number, title, description }: any) {

  return (

    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-lg transition text-center">

      <div className="text-3xl font-bold text-emerald-600 mb-3">
        {number}
      </div>

      <h3 className="font-semibold mb-2">{title}</h3>

      <p className="text-gray-600 text-sm">{description}</p>

    </div>

  );
}

/* ================================================= */
/* MAIN PAGE */
/* ================================================= */

export default function Home() {

  const phrases = [
    "Turn ingredients into recipes",
    "Let AI cook for you",
    "Scan your kitchen instantly",
    "Discover recipes with AI"
  ];

  const text = useTypewriter(phrases);

  return (

    <div className="relative min-h-screen bg-gray-50 overflow-hidden">

      <ScrollBar />
      <CursorTrail />
      <Spotlight />
      <Particles />
      <IngredientRain />

      {/* floating icons */}

      <Camera className="absolute top-40 left-20 text-emerald-400 animate-bounce" />
      <ChefHat className="absolute bottom-32 right-20 text-green-400 animate-bounce" />
      <Utensils className="absolute top-72 right-40 text-emerald-300 animate-bounce" />
      <Wand2 className="absolute bottom-20 left-32 text-green-300 animate-bounce" />

      <main className="relative max-w-6xl mx-auto px-6 py-24 flex flex-col gap-28">

        {/* HERO */}

        <section className="flex flex-col items-center text-center gap-8">

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 max-w-3xl leading-tight">

            The AI Cooking Assistant

            <span className="block mt-4 bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text text-transparent">

              {text}
              <span className="animate-pulse">|</span>

            </span>

          </h1>

          <p className="text-gray-600 text-lg max-w-xl leading-relaxed">

            Scan ingredients, manage your pantry,
            and generate delicious recipes instantly with AI.

          </p>

          <div className="flex gap-6 mt-6">

            <Link
              href="/scan"
              className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:scale-105 transition shadow-md"
            >
              Start Scanning
            </Link>

            <Link
              href="/saved"
              className="px-8 py-4 bg-white border border-gray-200 rounded-xl font-semibold hover:bg-gray-100 hover:scale-105 transition"
            >
              Explore Recipes
            </Link>

          </div>

        </section>

        {/* STATS */}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <StatCard target={500} label="Recipes Generated" />
          <StatCard target={120} label="Library Recipes" />
          <StatCard target={10000} label="Ingredients Scanned" />

        </section>

        {/* FEATURES */}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <FeatureCard
            icon={<Scan />}
            title="AI Ingredient Scanner"
            description="Upload a photo and instantly detect ingredients."
          />

          <FeatureCard
            icon={<Brain />}
            title="Smart Recipe Generator"
            description="AI creates recipes based on pantry ingredients."
          />

          <FeatureCard
            icon={<Box />}
            title="Pantry Manager"
            description="Track ingredients and manage your kitchen."
          />

        </section>

        {/* HOW IT WORKS */}

        <section className="flex flex-col gap-12">

          <h2 className="text-3xl font-bold text-center text-gray-900">
            How ServeAI Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <StepCard
              number="1"
              title="Scan Ingredients"
              description="Upload a photo of ingredients."
            />

            <StepCard
              number="2"
              title="AI Detects Items"
              description="AI identifies ingredients automatically."
            />

            <StepCard
              number="3"
              title="Generate Recipes"
              description="Get recipes instantly."
            />

          </div>

        </section>

        {/* CTA */}

        <section className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-3xl p-16 shadow-xl text-center max-w-4xl mx-auto">

          <Sparkles className="mx-auto mb-4 animate-spin" />

          <h2 className="text-3xl font-bold mb-4">
            Ready to cook with AI?
          </h2>

          <p className="text-white/90 mb-8 max-w-xl mx-auto leading-relaxed">
            Discover recipes instantly from ingredients you already have.
          </p>

          <Link
            href="/scan"
            className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:scale-105 transition shadow"
          >
            Try ServeAI
          </Link>

        </section>

      </main>

    </div>

  );
}