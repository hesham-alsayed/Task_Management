"use client";

import NavbarDesktopSkeleton from "../skeleton/NavbarDesktopSkeleton";
import Avatar from "./Avatar";

export type User = {
  name?: string;
  jobTitle?: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
};

type NavbarProps = {
  collapsed: boolean;
  user?: User; // مهم: optional
  isLoading?: boolean;
};

export default function NavbarDesktop({
  collapsed,
  user,
  isLoading,
}: NavbarProps) {
  if (isLoading || !user) {
    return <NavbarDesktopSkeleton />;
  }

  return (
    <header
      className={`
        fixed top-0 right-0 z-40 h-16 px-6 py-3 bg-[#f9f9ff]
        transition-all duration-300 border-b border-b-[#0000001A]
        ${collapsed ? "left-20" : "left-64"}
      `}
    >
      <div className="flex items-center justify-end h-full">
        <div className="flex items-center gap-4">
          {/* Text */}
          <div className="flex flex-col text-right">
            <h2 className="text-sm font-semibold text-[#041B3C] uppercase">
              {user?.name}
            </h2>

            {user?.jobTitle && (
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                {user.jobTitle}
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
