import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/ui/Navbar";
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
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}