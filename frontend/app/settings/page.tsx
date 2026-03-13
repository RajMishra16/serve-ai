"use client";

import { SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* When user is logged in */}
      <SignedIn>
        <div className="bg-white rounded-xl shadow p-6">
          <UserProfile />
        </div>
      </SignedIn>

      {/* When user is logged out */}
      <SignedOut>
        <p className="text-gray-600">
          Please sign in to manage your account settings.
        </p>
      </SignedOut>
    </div>
  );
}