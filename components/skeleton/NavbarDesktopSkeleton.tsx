"use client";

import React from "react";

export default function NavbarDesktopSkeleton() {
  return (
    <header
      className="
        fixed top-0 right-0 z-40 h-16 px-6 py-3 
        border-b border-b-[#0000001A]
        animate-pulse
      "
    >
      <div className="flex items-center justify-end h-full">
        <div className="flex items-center gap-4">
          {/* Text skeleton */}
          <div className="flex flex-col items-end gap-2">
            <div className="h-3 w-24 bg-[#E8EDFF] rounded" />
            <div className="h-2 w-16 bg-[#E8EDFF] rounded" />
          </div>

          {/* Avatar skeleton */}
          <div className="h-10 w-10 bg-[#E8EDFF] rounded-full" />
        </div>
      </div>
    </header>
  );
}