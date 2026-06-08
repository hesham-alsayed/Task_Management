"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  getCurrentUser,
} from "@/app/store/features/auth/authThunks";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const initAuth = async () => {
      const response = await dispatch(getCurrentUser());

      if (!getCurrentUser.fulfilled.match(response)) {
        router.replace("/login");
      }
    };

    initAuth();
  }, [dispatch, router]);

  // // ================= BLOCK EVERYTHING =================
  // if (status === "loading") {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center bg-white z-10000">
  //       <div className="flex flex-col items-center gap-3">
  //         <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
  //       </div>
  //     </div>
  //   );
  // }
  return <>{children}</>;
}
