"use client";

import { UserProfile, useUser } from "@clerk/nextjs";

export default function SettingsPage() {

  const { isSignedIn } = useUser();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {isSignedIn ? (
        <div className="bg-white rounded-xl shadow p-6">
          <UserProfile />
        </div>
      ) : (
        <p className="text-gray-600">
          Please sign in to manage your account settings.
        </p>
      )}

    </div>
  );
}