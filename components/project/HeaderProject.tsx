"use client";
import React from "react";
import PlusIcon from "../icons/PlusIcon";
import { useRouter } from "next/navigation";
import ButtonCreateProject from "./ButtonCreateProject";

export default function HeaderProject() {
  const router = useRouter();
  return (
    <div className="space-y-1 max-sm:mt-14">
      <h1 className="font-semibold text-[30px] text-main">Projects</h1>
      <span className="text-[#434654] font-normal text-[16px]">
        Manage and curate your projects
      </span>
    </div>
  );
}
