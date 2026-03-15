"use client";

import { UserProfile, useUser } from "@clerk/nextjs";
import PageHeader from "@/components/ui/PageHeader";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function SettingsPage() {

  const { isSignedIn } = useUser();

  return (

    <div className="relative min-h-screen bg-gray-50 overflow-hidden">

      <AnimatedBackground />

      <div className="relative max-w-7xl mx-auto px-6 py-10 space-y-10">

        <PageHeader
          title="Settings"
          subtitle="Manage your account preferences and profile"
        />

        {isSignedIn ? (

          <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm p-6 overflow-hidden transition hover:shadow-lg duration-300">

            {/* subtle glow */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-400/10 via-green-400/10 to-lime-400/10 pointer-events-none"></div>

            <div className="relative">
              <UserProfile />
            </div>

          </div>

        ) : (

          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500 shadow-sm">
            Please sign in to manage your account settings.
          </div>

        )}

      </div>

    </div>

  );
}