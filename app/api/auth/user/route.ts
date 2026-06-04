import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/user`,
      {
        method: "GET",
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          success: false,
          message: data?.msg || "Failed to get user",
        },
        {
          status: response.status,
        },
      );
    }

    return Response.json({
      success: true,
      user: data,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internet Connection Failed or Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
