"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/shared/Loader";
import PlusIcon from "@/components/icons/PlusIcon";

type Props = {
  loading: boolean;
  projectId: string;
};

export default function TaskActions({ loading, projectId }: Props) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col-reverse gap-5 sm:flex-row sm:justify-end sm:items-center sm:gap-2 mt-20 sm:mt-0">
      <button
        type="button"
        onClick={() => router.push(`/project/${projectId}/epics`)}
        className="btn-ghost max-sm:w-full"
      >
        Back
      </button>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary rounded p-6 flex items-center justify-center gap-2 sm:w-50 max-sm:w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <PlusIcon />
            Add New Task
          </>
        )}
      </button>
    </div>
  );
}