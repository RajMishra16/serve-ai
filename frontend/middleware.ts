import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/pantry(.*)",
  "/scan(.*)",
  "/recipes(.*)",
  "/saved(.*)",
  "/history(.*)",
  "/settings(.*)",
]);

const isAuthRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {

  const authData = await auth();
  const userId = authData?.userId;

  // Allow auth pages
  if (isAuthRoute(req)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users
  if (!userId && isProtectedRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};