import { auth } from "@clerk/nextjs/server";

export async function getAuthUser() {
  const authData = await auth();

  const userId = authData.userId;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return userId;
}