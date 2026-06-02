import RecoveryRedirect from "@/components/shared/RecoveryRedirect";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  return (
    <>
      <RecoveryRedirect />

      <div>
        <h1>Home Page</h1>
      </div>
    </>
  );
}
