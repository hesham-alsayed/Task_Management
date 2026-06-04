export async function refreshAccessToken(refreshToken: string) {
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
    }
  );

  return res.json();
}