"use client";

import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import LogoIcon from "../icons/LogoIcon";
import FolderIcon from "../icons/FolderIcon";
import EpicsIcon from "../icons/EpicsIcon";
import TaskIcon from "../icons/TaskIcon";
import MembersIcon from "../icons/MembersIcon";
import DetailsIcon from "../icons/DetailsIcon";
import ArrowMenu from "./ArrowMenu";
import LogoutIcon from "../icons/LogoutIcon";
import { useAppDispatch } from "@/app/store/hooks";
import { toggleSidebar } from "@/app/store/features/ui/uiSlice";

type SidebarProps = {
  collapsed: boolean;
};

export default function Sidebar({ collapsed }: SidebarProps) {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const params = useParams();
  const pathname = usePathname();

  const projectId = params.projectId as string;

  const navLinks = [
    {
      name: "Projects",
      href: "/project",
      icon: (
        <FolderIcon color={pathname === "/project" ? "#003D9B" : "#041B3C"} />
      ),
      isActive: pathname === "/project" || pathname.includes('/add'),
    },
  ];

  if (projectId) {
    navLinks.push(
      {
        name: "Project Epics",
        href: `/project/${projectId}/epics`,
        icon: (
          <EpicsIcon
            color={pathname.includes("/epics") ? "#003D9B" : "#041B3C"}
          />
        ),
        isActive: pathname.includes("/epics"),
      },
      {
        name: "Project Tasks",
        href: `/project/${projectId}/tasks?view=board`,
        icon: (
          <TaskIcon
            color={pathname.includes("/tasks") ? "#003D9B" : "#041B3C"}
          />
        ),
        isActive: pathname.includes("/tasks"),
      },
      {
        name: "Project Members",
        href: `/project/${projectId}/members`,
        icon: (
          <MembersIcon
            color={pathname.includes("/members") ? "#003D9B" : "#041B3C"}
          />
        ),
        isActive: pathname.includes("/members"),
      },
      {
        name: "Project Details",
        href: `/project/${projectId}/edit`,
        icon: (
          <DetailsIcon
            color={pathname.includes("/edit") ? "#003D9B" : "#041B3C"}
          />
        ),
        isActive: pathname.includes("/edit"),
      },
    );
  }

  return (
    <aside
      className={`
         h-screen
    bg-[#F1F3FF]
    p-4
      `}
    >
      <div className="flex h-full flex-col justify-between">
        {/* Top */}
        <div>
          {/* Logo */}
          <div className="pb-8">
            <div className="flex items-center gap-3">
              <LogoIcon />
              <span className="text-foreground font-bold text-[20px]">
                TASKLY
              </span>
            </div>
          </div>

          {/* Nav */}
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 p-2 rounded-sm font-medium ${
                    link.isActive ? "bg-white text-primary" : "text-[#041B3C]"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-2 pt-6 border-t border-[#C3C6D633]">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="flex items-center gap-3 p-2"
          >
            <ArrowMenu />
            Collapse
          </button>

          <button className="flex items-center gap-3 p-2 text-[#BA1A1A]">
            <LogoutIcon />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
