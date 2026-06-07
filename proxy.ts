import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { accessToken, refreshToken } from "@/lib/constant";

export async function proxy(request: NextRequest) {
  let token = request.cookies.get(accessToken)?.value;
  const refresh = request.cookies.get(refreshToken)?.value;
  const pathname = request.nextUrl.pathname;

  const authRoutes = ["/login", "/signup", "/reset-password"];
  const protectedRoutes = ["/projects"];

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

console.log(refresh)
  // 1. If user is already logged in, redirect away from auth pages
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/projects", request.url));
  }

  // 2. Check if route is protected but token is missing or expired
  if (!token && isProtectedRoute) {
    
    // 3. If we have a refresh token, attempt to generate a new access token
    if (refresh) {
      try {
        // Call the API directly using standard fetch (Edge compatible)
        const res = await fetch(`${process.env.BASE_URL}/auth/v1/token?grant_type=refresh_token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": process.env.API_KEY || "", 
          },
          body: JSON.stringify({ refresh_token: refresh }),
        });

        if (!res.ok) {
          throw new Error("Refresh token expired or invalid");
        }
        console.log(res)
        const data = await res.json(); 
        console.log(data)
        token = data.access_token; // Retrieve the newly generated token

        // 4. Create a successful response to continue the request
        const response = NextResponse.next();

        // 5. Save the newly generated access token into the cookies
        response.cookies.set({
          name: accessToken,
          value: token as string,
          httpOnly: true,
          path: "/",
          maxAge: 120, // Match your 120 seconds limit
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

        return response; // Proceed to the protected route with the new token

      } catch (error) {
        console.error("Token refresh failed:", error);
        
        // 6. If refresh fails, clear dead cookies and redirect to login
        const loginRedirect = NextResponse.redirect(new URL("/login", request.url));
        loginRedirect.cookies.delete(accessToken);
        loginRedirect.cookies.delete(refreshToken);
        
        return loginRedirect;
      }
    }

    // 7. No access token and no refresh token -> redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};