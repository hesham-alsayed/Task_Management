"use client";

import Navbar, { User } from "@/components/shared/NavbarDesktop";
import Sidebar from "@/components/shared/Sidebar";
import SidebarCollapsed from "../sidebar/SidebarCollapsed";
import { useEffect, useState } from "react";
import NavbarDesktop from "@/components/shared/NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import MobileFooter from "./MobileFooter";
import { useAppSelector } from "@/app/store/hooks";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const collapsed = useAppSelector(
  (state) => state.ui.sidebarCollapsed
);
  const { user } = useAppSelector((state) => state.auth);  
  return (
    <div className="min-h-screen ">
      <div
        className={`
          hidden lg:block fixed left-0 top-0 z-50 h-screen 
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        <div
          className={`
            absolute inset-0
            transition-opacity duration-300
            ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
        >
          <Sidebar collapsed={collapsed} />
        </div>

        <div
          className={`
            absolute inset-0
            transition-opacity duration-300
            ${collapsed ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <SidebarCollapsed  />
        </div>
      </div>

      <div className="hidden lg:block">
        <NavbarDesktop user={user} collapsed={collapsed} />
      </div>

      <div className="lg:hidden ">
        <NavbarMobile user={user} />
      </div>

      <main
        className={`
          pt-16 hidden lg:block  py-3 px-6 mb-10
          transition-all duration-300 ease-in-out bg-[#f9f9ff]]
          ${collapsed ? "ml-20" : "ml-64"}
        `}
      >
        <div className="py-4">{children}</div>
      </main>

      <main className="lg:hidden mt-20 max-sm:mt-4">
        <div className="p-2 mb-40">{children}</div>
      </main>
  
      <div className="lg:hidden bg-[#F1F3FF] fixed bottom-0 left-0 right-0 z-50">
        <MobileFooter />
      </div>
    </div>
  );
}
