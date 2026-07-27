// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   console.log("Middleware triggered for:", request.nextUrl.pathname); // Debugging log
//   debugger;
//   return NextResponse.redirect(new URL("/home", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*", // Middleware runs on /about and its subroutes
// };

// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Redirect if the path starts with /admin, /candidate, or /company
//   if (pathname.startsWith("/admin") || pathname.startsWith("/candidate") || pathname.startsWith("/company")) {
//     return NextResponse.redirect(new URL("/login", req.url)); // Redirect to /login
//   }

//   return NextResponse.next();
// }

// // Apply middleware only to specific routes
// export const config = {
//   matcher: ["/admin/:path*", "/candidate/:path*", "/company/:path*"], 
// };


import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get the authentication token from cookies
  const token = req.cookies.get("accessToken")?.value;

  // Redirect to /login if token is missing
  if (
    !token && 
    (pathname.startsWith("/admin") || pathname.startsWith("/candidate") || pathname.startsWith("/company"))
  ) {
    console.log(`Unauthorized access to ${pathname}, redirecting to /login`);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log(`Authorized access to ${pathname}, proceeding...`);
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/admin/:path*", "/candidate/:path*", "/company/:path*"], 
};

