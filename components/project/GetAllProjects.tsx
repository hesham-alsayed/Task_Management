"use client";

import HeaderProject from "./HeaderProject";
import CardNewProject from "./CardNewProject";
import { useGetAllProjects } from "@/hooks/useGetAllProjects";
import Pagination from "./Pagination";
import CardProject from "./CardProject";
import EmptyState from "./EmptyState";
import CardProjectSkeleton from "../skeleton/CardProjectSkeleton";
import ButtonCreateProject from "./ButtonCreateProject";
import ButtonCreateProjectSkeleton from "../skeleton/ButtonCreateProjectSkeleton";
import ErrorNetworkState from "./ErrorNetworkState";

export default function GetAllProjects() {
  const { projects, status, error, retryLoading, retryGetAllProjects } =
    useGetAllProjects();

  const hasProjects = (projects?.length ?? 0) > 0;

  const isLoading = status === "loading";
  const isError = status === "error";
  const isSuccess = status === "success";
  const isEmpty = isSuccess && !hasProjects;
  const finalProjects = projects.slice(0, 5);
  const skeletonArray = Array.from({ length: 6 });


  if (isLoading) {
    return (
      <main className="flex flex-col px-4">
        <div className="flex items-center justify-between">
          <HeaderProject />
          <ButtonCreateProjectSkeleton />
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
        retryGetAllProjects={retryGetAllProjects}
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
        <HeaderProject />

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {finalProjects.map((project: any) => (
            <CardProject key={project.id} project={project} />
          ))}

          <div className="hidden sm:block">
            <CardNewProject />
          </div>
        </div>

        {retryLoading && isError && (
          <div className="mt-6">
            <ErrorNetworkState
              isLoading={true}
              retryGetAllProjects={retryGetAllProjects}
            />
          </div>
        )}
      </div>

      <div className="mt-auto pt-10 hidden sm:block">
        <Pagination />
      </div>
    </main>
  );
}
