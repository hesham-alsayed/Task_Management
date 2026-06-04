"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";
import { getShortName } from "@/lib/helper";
import Avatar from "./Avatar";

export type User = {
  name?: string;
  job_title?: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
};
type NavbarProps = {
  collapsed: boolean;
  user: User;
};

export default function NavbarDesktop({ collapsed, user }: NavbarProps) {
  return (
    <header
      className={`
        fixed top-0 right-0 z-40 h-16 px-6 py-3
        transition-all duration-300 border-b border-b-[#0000001A]
        ${collapsed ? "left-20" : "left-64"}
      `}
    >
      <div className="flex items-center justify-end h-full">
        <div className="flex items-center gap-4">
          {/* Text */}
          <div className="flex flex-col text-right">
            <h2 className="text-sm font-semibold text[#041B3C] uppercase">
              {user?.name}
            </h2>

            {user?.job_title && (
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                {user.job_title}
              </span>
            )}
          </div>

          {/* Avatar */}
          <Avatar user={user} />
        </div>
      </div>
    </header>
  );
}
