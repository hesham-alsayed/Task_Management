"use client";

import HeaderProject from "./HeaderProject";
import CardNewProject from "./CardNewProject";
import { useGetAllProjects } from "@/hooks/useGetAllProjects";
import Pagination from "./Pagination";
import CardProject from "./CardProject";
import EmptyState from "./EmptyState";
import CardProjectSkeleton from "../skeleton/CardProjectSkeleton";
import ButtonCreateProjectSkeleton from "../skeleton/ButtonCreateProjectSkeleton";
import ErrorNetworkState from "./ErrorNetworkState";
import ButtonCreateProject from "./ButtonCreateProject";
import { useRouter } from "next/navigation";

export default function GetAllProjects() {
  const {
    projects,
    status,
    retryLoading,
    retryGetAllProjects,
    totalCount,
    totalPages,
    hasNextPage,
    hasPrevPage,
    page,
    limit,
    loadMoreRef,
    loadingMore,
    isMobile,
  } = useGetAllProjects();

  const router = useRouter();

  const hasProjects = (projects?.length ?? 0) > 0;

  const isLoading = status === "loading";
  const isError = status === "error";
  const isSuccess = status === "success";
  const isEmpty = isSuccess && !hasProjects && !loadingMore;

  const skeletonArray = Array.from({ length: limit });

  if (isLoading) {
    return (
      <main className="flex flex-col px-4">
        <div className="flex items-center justify-between">
          <HeaderProject />
          <div className="hidden sm:block">
            <ButtonCreateProjectSkeleton />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10">
          {skeletonArray.map((_, i) => (
            <CardProjectSkeleton key={i} />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <ErrorNetworkState
        isLoading={retryLoading}
        retryFunction={retryGetAllProjects}
      />
    );
  }

  if (isEmpty) {
    return (
      <main className="px-4 lg:px-0">
        <HeaderProject />
        <EmptyState />
      </main>
    );
  }

  return (
    <main className="flex flex-col px-4 lg:px-0">
      <div className="flex-1 space-y-10">
        <div className="flex items-center justify-between">
          <HeaderProject />
          <div className="hidden sm:block">
            <ButtonCreateProject />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <CardProject project={project} key={project.id} />
          ))}

          <div className="hidden sm:block">
            <CardNewProject />
          </div>
        </div>

        <div className="flex items-end justify-end sm:hidden">
          <button
            onClick={() => router.push("/project/add")}
            className="w-14 h-14 rounded-lg flex items-center justify-center bg-primary"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="white" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={loadMoreRef}
        className="h-20 flex items-center justify-center sm:hidden"
      >
        {loadingMore && (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
            <span>Load more...</span>
          </div>
        )}
      </div>

      {!isMobile && (
        <div className="mt-auto pt-10 hidden sm:block">
          <Pagination
            currentPage={page}
            actualLength={projects.length}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            totalPages={totalPages}
            totalCount={totalCount}
          />
        </div>
      )}
    </main>
  );
}
