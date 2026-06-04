"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoIcon from "../icons/LogoIcon";

import { navLinks } from "../../lib/NavLinks";
import LogoutIcon from "../icons/LogoutIcon";
type Props = {
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SidebarCollapsed({ setCollapsed }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className="h-screen
    bg-[#F1F3FF]
    p-4
    flex flex-col justify-between items-center"
    >
      <div>
        {/* Icons */}
        <div className="flex flex-col items-center mt-2 gap-2 ">
          <div>
            <LogoIcon />
          </div>
          <div className="mt-8 flex  flex-col items-center ">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
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
                    {item.icon(isActive)}
                  </Link>
                </li>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex flex-col gap-3">
        <button onClick={() => setCollapsed(false)} className="p-2">
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
