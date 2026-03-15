"use client";

import { SignUp } from "@clerk/nextjs";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function Page() {

  return (

    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center overflow-hidden">

      <AnimatedBackground />

      <div className="relative">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 transition hover:shadow-lg duration-300">

          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            fallbackRedirectUrl="/dashboard"
          />

        </div>

      </div>

    </div>

  );

}