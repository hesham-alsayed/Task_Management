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
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAppSelector((state) => state.auth); 
  console.log(user)
  return (
    <div className="min-h-screen bg-background">
      <div
        className={`
          hidden lg:block fixed left-0 top-0 z-50 h-screen bg-[#F1F3FF]
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
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        <div
          className={`
            absolute inset-0
            transition-opacity duration-300
            ${collapsed ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <SidebarCollapsed setCollapsed={setCollapsed} />
        </div>
      </div>

      <div className="hidden lg:block">
        <NavbarDesktop user={user} collapsed={collapsed} />
      </div>

      <div className="lg:hidden">
        <NavbarMobile user={user} />
      </div>

      <main
        className={`
          pt-16 hidden lg:block
          transition-all duration-300 ease-in-out
          ${collapsed ? "ml-20" : "ml-64"}
        `}
      >
        <div className="p-6">{children}</div>
      </main>

      <main className="lg:hidden">
        <div className="p-6">{children}</div>
      </main>
  
      <div className="lg:hidden bg-[#F1F3FF] fixed bottom-0 left-0 right-0 z-50">
        <MobileFooter />
      </div>
    </div>
  );
}
