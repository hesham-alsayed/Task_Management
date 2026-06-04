"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";
import { getShortName } from "@/lib/helper";

export type User = {
  name?: string;
  job_title?: string;
};

type NavbarProps = {
  collapsed: boolean; 
  user: User
};


export default function NavbarDesktop({ collapsed , user }: NavbarProps) {
  const shortName = getShortName(user?.name);
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
          <div className="w-10 h-10 rounded-xl bg-primary text-[#FFFFFF] flex items-center justify-center text-[16px] font-bold ">
            {shortName}
          </div>
        </div>
      </div>
    </header>
  );
}
