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
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/projects", request.url));
  }

  if (!token && isProtectedRoute) {
    
    if (refresh) {
      try {
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
        token = data.access_token; 

        const response = NextResponse.next();

        response.cookies.set({
          name: accessToken,
          value: token as string,
          httpOnly: true,
          path: "/",
          maxAge: 3600, 
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

        return response; 

      } catch (error) {
        console.error("Token refresh failed:", error);
        
        const loginRedirect = NextResponse.redirect(new URL("/login", request.url));
        loginRedirect.cookies.delete(accessToken);
        loginRedirect.cookies.delete(refreshToken);
        
        return loginRedirect;
      }
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
