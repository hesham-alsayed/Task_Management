"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "./NavbarDesktop";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import ToastMessage from "./ToastMessage";
import LogoutIcon from "../icons/LogoutIcon";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { logoutUser } from "@/app/store/features/auth/authThunks";
import { getShortName } from "@/lib/helper/get-shortname";

type Props = {
  user: User;
};

export default function Avatar({ user }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const shortName = getShortName(user?.name);
  const dispatch = useAppDispatch();
  const { logoutLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 const handleLogout = async () => {
  try {
    const result = await dispatch(
      logoutUser()
    ).unwrap();

    toast.success( result.message || "logout success");
    router.replace("/login");
  } catch (error) {
    toast.error(
      typeof error === "string"
        ? error
        : "Logout failed"
    );
  }
};

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center text-[16px] font-bold cursor-pointer hover:opacity-90 transition"
      >
        {shortName}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden z-50 animate-in fade-in zoom-in-95">
          <div className="px-3 py-2 text-sm text-gray-500 border-b">
            {user?.name}
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-red-700 hover:bg-red-100 cursor-pointer px-3 py-2 text-sm transition"
          >
            <LogoutIcon />
            Logout
            {logoutLoading && <Loader />}
          </button>
        </div>
      )}
      {error && <ToastMessage message={error} type="error" />}
    </div>
  );
}
