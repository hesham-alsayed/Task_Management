"use client";
import HeaderEpicList from "./HeaderEpicList";
import { useProjectForm } from "@/hooks/useProjectForm";
import EpicList from "./EpicList";
import { useGetAllEpics } from "@/hooks/useGetAllEpics";
import PlusIcon from "../icons/PlusIcon";
import EpicListSkeleton from "../skeleton/EpicListSkeleton";
import EpicEmptyState from "./EpicEmptyState";
import ErrorNetworkState from "../projects/ErrorNetworkState";
import Pagination from "../shared/Pagination";
import Loader from "../shared/Loader";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import EpicModalDetails from "../epicDetails/EpicModalDetails";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setAllEpics } from "@/app/store/features/epics/epicsSlice";
import SearchEmptyState from "../shared/SearchEmptyState";
import SearchErrorState from "../shared/SearchErrorState";

export default function EpicListMain() {
  const { initialProject } = useProjectForm();
  const {
    error,
    retryGetData,
    retryLoading,
    status,
    data,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    loadMoreRef,
    loadingMore,
    isMobile,
    finalLimit,
    totalCount,
  } = useGetAllEpics();
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("title")?.trim() || "";

  const hasEpics = (data?.length ?? 0) > 0;
  const isLoading = status === "loading";
  const isGlobalError = status === "error" && !searchValue;
  const isSuccess = status === "success";
  const isEmptyProject = isSuccess && !hasEpics && !searchValue;

  const isEmptySearch = isSuccess && !hasEpics && searchValue;
  const isErrorSearch = status === "error" && searchValue;

  const { epics } = useAppSelector((state) => state.epics);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAllEpics(data));
  }, [data]);

  if (isLoading) {
    return <EpicListSkeleton />;
  }
  if (isEmptyProject) {
    return <EpicEmptyState />;
  }

  if (isGlobalError) {
    return (
      <ErrorNetworkState
        retryFunction={retryGetData}
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
      <EpicList data={epics} />
      {isEmptySearch && <SearchEmptyState searchValue={searchValue} typeData="Epics" />}
      {isErrorSearch && <SearchErrorState searchValue={searchValue} error={error || ""} />}
      <div ref={loadMoreRef} className="h-20 flex items-center justify-center sm:hidden">
        {loadingMore && (
          <div className="flex items-center gap-2">
            <Loader />
          </div>
        )}
      </div>
      <div className="flex items-end justify-end sm:hidden mt-10 fixed bottom-20 right-8">
        <button
          onClick={() => router.push(`/project/${projectId}/epics/new`)}
          className=" btn-primary w-12 h-12 rounded-sm flex items-center justify-center"
        >
          <PlusIcon />
        </button>
      </div>
      {!isMobile && totalPages > 1 && (
        <div className="hidden sm:block">
          <Pagination
            actualLength={data.length}
            currentPage={page}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            totalPages={totalPages}
            limit={finalLimit.toString()}
            totalCount={totalCount}
            type="epics"
          />
        </div>
      )}
      <EpicModalDetails />
    </div>
  );
}
