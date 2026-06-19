import EpicsIcon from "../components/icons/EpicsIcon";
import FolderIconMobile from "../components/icons/FolderIconMobile";
import TaskIcon from "../components/icons/TaskIcon";
import MembersIcon from "../components/icons/MembersIcon";
import DetailsIcon from "../components/icons/DetailsIcon";

export type NavItem = {
  name: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
  isActive?: boolean;
};

export const getNavLinks = (
  projectId: string | undefined,
  pathname: string,
): NavItem[] => {
  return [
    {
      name: "Projects",
      href: "/project",
      isActive: pathname === "/project" || pathname === "/project/add",
      icon: (active) => (
        <FolderIconMobile color={active ? "#0052CC" : "#041B3C99"} />
      ),
    },

    ...(projectId
      ? [
          {
            name: "Project Epics",
            href: `/project/${projectId}/epics`,
            isActive: pathname.includes("/epics"),
            icon: (active: boolean) => (
              <EpicsIcon color={active ? "#0052CC" : "#041B3C99"} />
            ),
          },
          {
            name: "Project Tasks",
            href: `/project/${projectId}/tasks?view=board`,
            isActive: pathname.includes("/tasks"),
            icon: (active: boolean) => (
              <TaskIcon color={active ? "#0052CC" : "#041B3C99"} />
            ),
          },
          {
            name: "Project Members",
            href: `/project/${projectId}/members`,
            isActive: pathname.includes("/members"),
            icon: (active: boolean) => (
              <MembersIcon color={active ? "#0052CC" : "#041B3C99"} />
            ),
          },
          {
            name: "Project Details",
            href: `/project/${projectId}/edit`,
            isActive: pathname.includes("/edit"),
            icon: (active: boolean) => (
              <DetailsIcon color={active ? "#0052CC" : "#041B3C99"} />
            ),
          },
        ]
      : []),
  ];
};
