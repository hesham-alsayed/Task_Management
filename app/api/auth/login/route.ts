import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json();

    // ❌ ERROR
    if (!response.ok) {
      return Response.json(
        {
          success: false,
          message: data?.msg || "Invalid credentials",
        },
        {
          status: response.status,
        },
      );
    }

    console.log(data);
    const cookieStore = await cookies();

    // check rememberMe if true before save it in cookies
    const rememberMe = body.rememberMe
    console.log(rememberMe);
    const refreshMaxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;

    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: data.expires_in,
    });

    cookieStore.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: refreshMaxAge,
    });

    return Response.json({
      success: true,
      user: data.user,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
