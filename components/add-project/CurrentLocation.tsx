"use client";

import { usePathname } from "next/navigation";
import FragmentIcon from "../icons/FragmentIcon";

const formatLabel = (value: string) => {
  const map: Record<string, string> = {
    projects: "Projects",
    add: "Add New Project",
    edit: "Edit Project",
    profile: "User Profile",
  };

  return map[value] || value;
};

export default function CurrentLocation() {
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-2">
      {parts.map((part, index) => {
        const isLast = index === parts.length - 1;

        const label = formatLabel(part);

        return (
          <div 
          style={{
            letterSpacing : "1.2px"
          }}
            key={part}
            className="flex items-center gap-2 font-bold text-[12px] uppercase"
          >
            {index !== 0 && <FragmentIcon />}

            {isLast ? (
              <p className="text-primary">{label}</p>
            ) : (
              <span className="text-[#43465499]">{label}</span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
