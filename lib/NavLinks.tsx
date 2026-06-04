
import EpicsIcon from './../components/icons/EpicsIcon';
import FolderIconMobile from './../components/icons/FolderIconMobile';
import TaskIcon from './../components/icons/TaskIcon';
import MembersIcon from './../components/icons/MembersIcon';
import DetailsIcon from './../components/icons/DetailsIcon';

export type NavItem = {
  name: string;
  href: string;
  icon: (active?: boolean) => React.ReactNode;
};

export const navLinks: NavItem[] = [
  {
    name: "Projects",
    href: "/projects",
    icon: (active) => (
      <FolderIconMobile color={active ? "#0052CC" : "#041B3C99"} />
    ),
  },
  {
    name: "Project Epics",
    href: "/project-epics",
    icon: (active) => (
      <EpicsIcon color={active ? "#0052CC" : "#041B3C99"} />
    ),
  },
  {
    name: "Project Tasks",
    href: "/project-tasks",
    icon: (active) => (
      <TaskIcon color={active ? "#0052CC" : "#041B3C99"} />
    ),
  },
  {
    name: "Project Members",
    href: "/project-members",
    icon: (active) => (
      <MembersIcon color={active ? "#0052CC" : "#041B3C99"} />
    ),
  },
  {
    name: "Project Details",
    href: "/project-details",
    icon: (active) => (
      <DetailsIcon color={active ? "#0052CC" : "#041B3C99"} />
    ),
  },
];