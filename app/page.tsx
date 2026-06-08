"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (hash) {
      const params = new URLSearchParams(hash);

      router.replace(`/reset-password?${params.toString()}`);
    } else {
      router.replace("/project");
    }
  }, [router]);

  return null;
}
