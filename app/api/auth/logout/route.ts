import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        { success: false, message: "no session" },
        { status: 401 },
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/logout`,
      {
        method: "POST",
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    // ✅ handle 204 properly
    if (response.status === 204) {
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");

      return Response.json({
        success: true,
        message: "Logged out",
      });
    }

  } catch {
    return Response.json(
      { success: false, message: "Internal error" },
      { status: 500 },
    );
  }
}
