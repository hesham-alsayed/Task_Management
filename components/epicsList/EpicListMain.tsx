"use client";
import React from "react";
import HeaderEpicList from "./HeaderEpicList";
import { useProjectForm } from "@/hooks/useProjectForm";
import EpicList from "./EpicList";
import { useGetAllEpics } from "@/hooks/useGetAllEpics";
import Pagination from "./PaginationEpics";
import PaginationEpics from "./PaginationEpics";
import PlusIcon from "../icons/PlusIcon";
import EpicListSkeleton from "../skeleton/EpicListSkeleton";
import EpicEmptyState from "./EpicEmptyState";
import ErrorNetworkState from "../projects/ErrorNetworkState";

export default function EpicListMain() {
  const { initialProject } = useProjectForm();
  const { data, error, retryGetAllEpics, retryLoading, status } =
    useGetAllEpics();
  //   const data: any[] = [];
  const hasEpics = (data?.length ?? 0) > 0;

  const isLoading = status === "loading";
  const isError = status === "error";
  const isSuccess = status === "success";
  const isEmpty = isSuccess && !hasEpics;
  if (isLoading) {
    return <EpicListSkeleton />;
  }
  if (isEmpty) {
    return <EpicEmptyState />;
  }

  if (isError) {
    return (
      <ErrorNetworkState
        retryFunction={retryGetAllEpics}
        isLoading={retryLoading}
        error={error ?? ""}
      />
    );
  }
  return (
    <div className="max-lg:mx-4 space-y-10">
      <div>
        <HeaderEpicList
          projectId={initialProject?.id ?? ""}
          projectName={initialProject?.name ?? ""}
        />
      </div>
      <EpicList data={data} />
      <div className="flex items-end justify-end sm:hidden mt-10">
        <button className=" btn-primary w-12 h-12 rounded-sm flex items-center justify-center">
          <PlusIcon />
        </button>
      </div>
      <div className="hidden sm:block">
        <PaginationEpics />
      </div>
    </div>
  );
}
