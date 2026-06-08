"use client";
import React from "react";
import NewProjectIcon from "../icons/NewProjectIcon";
import { useRouter } from "next/navigation";

export default function CardNewProject() {
  const router = useRouter();
  return (
    <div className="h-55  flex flex-col items-center justify-center p-6 bg-white ">
      <button
        onClick={() => router.push("/project/add")}
        className="space-y-2  flex items-center flex-col justify-center"
      >
        <div className="bg-[#F1F3FF] w-12 h-12 rounded-xl flex items-center justify-center">
          <NewProjectIcon />
        </div>
        <span className="text-sm text-[#434654] font-bold">ADD PROJECT</span>
      </button>
    </div>
  );
}
