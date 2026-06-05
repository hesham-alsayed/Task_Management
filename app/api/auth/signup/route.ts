
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log(data);
    // ❌ error handling
    if (!response.ok) {
      return Response.json(
        {
          success: false,
          message: data?.msg || "Signup failed",
        },
        {
          status: response.status,
        }
      );
    }

    // // optional: save tokens if API returns them (some systems do)
    // const cookieStore = cookies();

    // if (data.access_token) {
    //   cookieStore.set("access_token", data.access_token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "lax",
    //     path: "/",
    //     maxAge: data.expires_in || 60 * 60 * 24 * 7,
    //   });
    // }

    // if (data.refresh_token) {
    //   cookieStore.set("refresh_token", data.refresh_token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "lax",
    //     path: "/",
    //     maxAge: 60 * 60 * 24 * 30,
    //   });
    // }

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
      }
    );
  }
}