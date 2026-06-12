"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import DetailsIcon from "../icons/DetailsIcon";
import EpicsIcon from "../icons/EpicsIcon";
import FolderIconMobile from "../icons/FolderIconMobile";
import MembersIcon from "../icons/MembersIcon";
import TaskIcon from "../icons/TaskIcon";

export default function MobileFooter() {
  const pathname = usePathname();
  const params = useParams();

  const projectId = params.projectId as string | undefined;

  const navLinks = [
    {
      name: "Project",
      href: "/project",
      icon: (
        <FolderIconMobile
          color={pathname === "/project" ? "#0052CC" : "#041B3CB2"}
        />
      ),
      isActive: pathname === "/project",
    },
  ];

  if (projectId) {
    navLinks.push(
      {
        name: "Epics",
        href: `/project/${projectId}/epics`,
        icon: (
          <EpicsIcon
            color={pathname.includes("/epics") ? "#0052CC" : "#041B3CB2"}
          />
        ),
        isActive: pathname.includes("/epics"),
      },
      {
        name: "Tasks",
        href: `/project/${projectId}/tasks`,
        icon: (
          <TaskIcon
            color={pathname.includes("/tasks") ? "#0052CC" : "#041B3CB2"}
          />
        ),
        isActive: pathname.includes("/tasks"),
      },
      {
        name: "Members",
        href: `/project/${projectId}/members`,
        icon: (
          <MembersIcon
            color={pathname.includes("/members") ? "#0052CC" : "#041B3CB2"}
          />
        ),
        isActive: pathname.includes("/members"),
      },
      {
        name: "Details",
        href: `/project/${projectId}/edit`,
        icon: (
          <DetailsIcon
            color={pathname.includes("/edit") ? "#0052CC" : "#041B3CB2"}
          />
        ),
        isActive: pathname.includes("/edit"),
      },
    );
  }

  return (
    <footer className="h-16 bg-white border-t border-[#E5E7EB] flex items-center justify-evenly">
      {navLinks.map((item) => ( 
        
        <Link
          key={item.name}
          href={item.href}
          className={`flex flex-col items-center gap-1 text-[10px] ${
            item.isActive
              ? "text-[#0052CC] font-semibold"
              : "text-[#041B3C] font-normal"
          }`}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </footer>
  );
}
