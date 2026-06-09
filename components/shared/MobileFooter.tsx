"use client";

import { usePathname } from "next/navigation";
import DetailsIcon from "../icons/DetailsIcon";
import EpicsIcon from "../icons/EpicsIcon";
import FolderIconMobile from "../icons/FolderIconMobile";
import MembersIcon from "../icons/MembersIcon";
import TaskIcon from "../icons/TaskIcon";
import Link from "next/link";

export default function MobileFooter() {
  const pathName = usePathname();
  const navLinks = [
    {
      name: "Project",
      href: "/projects",
      icon: (
        <FolderIconMobile
          color={`${pathName.startsWith("/project") ? "#0052CC" : "#041B3CB2"}`}
        />
      ),
      isActive: pathName.startsWith("/project"),
    },
    {
      name: "Epics",
      href: "/project-epics",
      icon: (
        <EpicsIcon
          color={
            pathName.startsWith("/project-epics") ? "#0052CC" : "#041B3CB2"
          }
        />
      ),
      isActive: pathName.startsWith("/project-epics"),
    },
    {
      name: "Tasks",
      href: "/project-tasks",
      icon: (
        <TaskIcon
          color={
            pathName.startsWith("/project-tasks") ? "#0052CC" : "#041B3CB2"
          }
        />
      ),
      isActive: pathName.startsWith("/project-tasks"),
    },
    {
      name: "Members",
      href: "/project-members",
      icon: (
        <MembersIcon
          color={
            pathName.startsWith("/project-members") ? "#0052CC" : "#041B3CB2"
          }
        />
      ),
      isActive: pathName.startsWith("/project-members"),
    },
    {
      name: "Details",
      href: "/project-details",
      icon: (
        <DetailsIcon
          color={
            pathName.startsWith("/project-details") ? "#0052CC" : "#041B3CB2"
          }
        />
      ),
      isActive: pathName.startsWith("/project-details"),
    },
  ];
  return (
    <footer className="h-16 bg-white border-t border-[#E5E7EB] flex items-center justify-evenly ">
      {navLinks.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className={`flex text-[10px] flex-col items-center gap-1 ${item.isActive ? "text-[#0052CC] font-semibold" : "text-[#041B3C] font-normal"}`}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </footer>
  );
}
