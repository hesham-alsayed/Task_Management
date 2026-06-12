"use client";

import { useState } from "react";
import BurgerIcon from "../icons/BurgerIcon";
import LogoutIcon from "../icons/LogoutIcon";
import Link from "next/link";
import LogoIcon from "../icons/LogoIcon";
import { useParams, usePathname, useRouter } from "next/navigation";
import Avatar from "./Avatar";
import { User } from "./NavbarDesktop";
import { getShortName } from "@/lib/helper/get-shortname";
import { getNavLinks } from "@/lib/NavLinks";

type Props = {
  user: User;
};

export default function NavbarMobile({ user }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const shortName = getShortName(user?.name);
  const params = useParams();
  const projectId = params.projectId as string;
  return (
    <>
      <div
        className="h-16 border-b w-full  fixed top-0 right-0 z-40 px-6 py-3 bg-[#f9f9ff]
        transition-all duration-300  border-b-[#0000001A]  flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="hover:cursor-pointer"
          >
            <BurgerIcon />
          </button>

          <span className="text-[#041B3C] font-bold text-[20px] leading-5 tracking-[-0.5px]">
            TASKLY
          </span>
        </div>

        {user ? (
          <Avatar user={user} />
        ) : (
          <div className="w-10 h-10 rounded-full bg-skeleton animate-pulse" />
        )}
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-[#041B3C66] z-999 backdrop-filter:blur(4px)"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[288px] bg-[#F1F3FF] p-4 z-1000 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
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
              {getNavLinks(projectId, pathname).map((item) => {
                const isActive = item.isActive;
                return (
                  <li key={item.href} className="list-none ">
                    <button
                      onClick={() => {
                        router.push(item.href);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center hover:bg-[#FFFFFF]  gap-3 p-2 rounded-sm font-medium ${
                        isActive
                          ? "bg-white text-[#0052CC]"
                          : "text-[#041B3C99]"
                      }`}
                    >
                      {item.icon(isActive!!)}
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-2 pt-2 mx-2 border-t border-[#C3C6D633]">
            <div className=" pt-20 text-[#BA1A1A]">
              <button className="flex items-center gap-2 ">
                <LogoutIcon />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
