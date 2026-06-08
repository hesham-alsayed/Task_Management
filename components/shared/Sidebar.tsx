"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const navLinks = [
    {
      name: "Projects",
      href: "/project",
      icon: <FolderIcon />,
      isActive: pathName.startsWith("/project"),
    },
    {
      name: "Project Epics",
      href: "/project-epics",
      icon: (
        <EpicsIcon
          color={pathName.startsWith("/project-epics") ? "#003d9b" : "#041B3C"}
        />
      ),
      isActive: pathName.startsWith("/project-epics"),
    },
    {
      name: "Project Tasks",
      href: "/project-tasks",
      icon: (
        <TaskIcon
          color={pathName.startsWith("/project-tasks") ? "#003d9b" : "#041B3C"}
        />
      ),
      isActive: pathName.startsWith("/project-tasks"),
    },
    {
      name: "Project Members",
      href: "/project-members",
      icon: (
        <MembersIcon
          color={
            pathName.startsWith("/project-members") ? "#003d9b" : "#041B3C"
          }
        />
      ),
      isActive: pathName.startsWith("/project-members"),
    },
    {
      name: "Project Details",
      href: "/project-details",
      icon: (
        <DetailsIcon
          color={
            pathName.startsWith("/project-details") ? "#003d9b" : "#041B3C"
          }
        />
      ),
      isActive: pathName.startsWith("/project-details"),
    },
  ];

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
