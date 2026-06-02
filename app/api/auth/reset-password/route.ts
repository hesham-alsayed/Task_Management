export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const accessToken = req.headers
      .get("authorization")
      ?.replace("Bearer ", "");

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "Missing access token",
        },
        { status: 401 },
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/user`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          password: body.password,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          success: false,
          message: data?.message || data?.msg || "Failed to update password",
        },
        { status: response.status },
      );
    }

    return Response.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
