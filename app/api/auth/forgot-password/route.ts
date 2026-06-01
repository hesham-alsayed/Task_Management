export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/recover`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify({
          email: body.email,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          success: false,
          message: data?.msg || "Request failed",
        },
        { status: response.status },
      );
    }

    return Response.json({
      success: true,
      message:
        "If an account exists with this email, we've sent a password reset link.",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internet Connection Failed or Internal server error",
      },
      { status: 500 },
    );
  }
}
