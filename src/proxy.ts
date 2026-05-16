import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|favicon.ico).*)",
  ],
};

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Set the base domains (for production, replace localhost:3000 with your actual domain)
  const isLocalhost = hostname.includes("localhost:3000");
  const baseDomain = isLocalhost ? "localhost:3000" : "lumisera.com";

  // Check if we are on a subdomain
  // e.g., aziz.localhost:3000 -> aziz
  // e.g., aziz.lumisera.com -> aziz
  const isSubdomain = hostname !== baseDomain && hostname.endsWith(baseDomain);
  const subdomain = isSubdomain ? hostname.replace(`.${baseDomain}`, "") : null;

  if (subdomain) {
    // Rewrite requests to the subdomain dynamic route
    // e.g., /about -> /[username]/about
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }

  return NextResponse.next();
}
