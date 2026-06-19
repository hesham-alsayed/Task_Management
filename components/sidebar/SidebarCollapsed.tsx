"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import LogoIcon from "../icons/LogoIcon";

import { getNavLinks } from "../../lib/NavLinks";
import LogoutIcon from "../icons/LogoutIcon";
import { useAppDispatch } from "@/app/store/hooks";
import { toggleSidebar } from "@/app/store/features/ui/uiSlice";

export default function SidebarCollapsed() {
  const pathname = usePathname();
  const params = useParams();
  const projectId = params.projectId as string;
  const dispatch = useAppDispatch();
  return (
    <aside
      className="h-screen
    bg-[#F1F3FF]
    p-4
    flex flex-col justify-between items-center"
    >
      <div>
        <div className="flex flex-col items-center mt-2 gap-2 ">
          <div>
            <LogoIcon />
          </div>
          <div className="mt-8 flex  flex-col items-center ">
            {getNavLinks(projectId, pathname).map((item) => {
              const isActive = item.isActive;
              return (
                <li key={item.href} className="list-none">
                  <Link
                    href={item.href}
                    className={`p-2 rounded-sm ${
                      isActive
                        ? "box-shadow: 0px 1px 2px 0px #0000000D  rounded-sm bg-white w-[48px] h-[48px] flex items-center justify-center"
                        : "text-[#041B3C99]"
                    }`}
                  >
                    {item.icon(isActive!!)}
                  </Link>
                </li>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={() => dispatch(toggleSidebar())} className="p-2">
          <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.78301 6.16699e-06L11.7787 10.0043L1.77442 20L0.000178955 18.2242L8.22871 10.0028L0.00725113 1.77424L1.78301 6.16699e-06Z"
              fill="#041B3C"
            />
          </svg>
        </button>

        <button className="p-2">
          <LogoutIcon />
        </button>
      </div>
    </aside>
  );
}
