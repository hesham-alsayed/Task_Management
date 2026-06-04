import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token" },
        { status: 401 },
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/token?grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data?.msg || "Refresh failed" },
        { status: 401 },
      );
    }

   
    const response = NextResponse.json({
      success: true,
      access_token: data.access_token,
    });

    response.cookies.set("access_token", data.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: data.expires_in ?? 60 * 60 * 2,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
