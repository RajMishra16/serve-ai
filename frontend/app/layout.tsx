import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/ui/Navbar";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "ServeAI",
  description: "AI powered pantry and recipe assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >

      <html lang="en">

        <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">

          <div className="relative flex flex-col min-h-screen overflow-hidden">

            {/* Global Animated Background */}
            <AnimatedBackground />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="relative flex-1 w-full">
              {children}
            </main>

          </div>

        </body>

      </html>

    </ClerkProvider>
  );
}