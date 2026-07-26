import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localeDetection: false,
});

export async function proxy(request: NextRequest) {
  // Refresh Supabase session
  await updateSession(request);

  const { pathname } = request.nextUrl;

  // Skip next-intl for admin routes
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Apply next-intl to all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|admin|_next|.*\\..*).*)"],
};