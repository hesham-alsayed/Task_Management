"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (hash) {
      router.replace(`/reset-password?${hash}`);
    } else {
      router.replace("/projects");
    }
  }, [router]);

  return null;
}