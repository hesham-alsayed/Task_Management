"use client";
import Link from "next/link";
import React from "react";
import PlusIcon from "../icons/PlusIcon";

type Props = {
  projectId: string;
};
export default function ButtonAddNewTask({ projectId }: Props) {
  return (
    <div className="hidden sm:block fixed bottom-6 right-6 z-50">
      <Link
        href={`/project/${projectId}/tasks/new`}
        className="btn-primary rounded-lg py-7 px-6 flex items-center justify-center gap-2"
      >
        <PlusIcon />
      </Link>
    </div>
  );
}
