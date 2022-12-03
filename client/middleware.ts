import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // Token will exist if user is logged in
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  const { pathname, origin } = req.nextUrl;

  if (pathname.startsWith("/_next")) return NextResponse.next();

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect to index page if the following is true
  if (token && pathname === "/") {
    return NextResponse.redirect(`${origin}/`);
  }

  // Otherwise redirect to login page
  if (!token && pathname !== "/login" && pathname !== "/register") {
    return NextResponse.redirect(`${origin}/login`);
  }
}
