"use client";
import React from "react";
import PlusIcon from "../icons/PlusIcon";
import { useRouter } from "next/navigation";

export default function ButtonCreateProject() {
  const router = useRouter();
  return (
    <div className=" flex items-end ">
      <button
        onClick={() => router.push("/project/add")}
        className="btn-primary py-3 px-6 flex items-center text-[16px] gap-2"
      >
        <PlusIcon /> Create New Project
      </button>
    </div>
  );
}
