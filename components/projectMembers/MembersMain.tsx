"use client";
import React from "react";
import HeaderMembers from "./HeaderMembers";
import { useProjectForm } from "@/hooks/useProjectForm";
import MembersTable from "./MembersTable";
import { useMembersProject } from "@/hooks/useMembersProject";
import ErrorNetworkState from "../projects/ErrorNetworkState";
import MembersPageSkeleton from "../skeleton/MembersPageSkeleton";
import { useAppSelector } from "@/app/store/hooks";
import MobileMembersCard from "./MobileMembersCard";
import MobileMembersSkeleton from "../skeleton/MobileMembersSkeleton";

export default function MembersMain() {
  const { initialProject } = useProjectForm();
  const { data, retryLoading, status, retryGetMembersProject, error } =
    useMembersProject();

  const isLoading = status === "loading" || !initialProject;
  const isError = status === "error";
  const collapsed = useAppSelector((state) => state.ui.sidebarCollapsed);
  if (isLoading) {
    return (
      <>
        <div className=" hidden sm:block">
          <MembersPageSkeleton />
        </div>
        <div className="sm:hidden">
          <MobileMembersSkeleton />
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <ErrorNetworkState
        isLoading={retryLoading}
        retryFunction={retryGetMembersProject}
        error={error || undefined}
      />
    );
  }

  return (
    <main className="max-lg:px-4">
      <div className="hidden sm:block">
        <HeaderMembers
          projectId={initialProject?.id || ""}
          projectName={initialProject?.name || ""}
        />
      </div>
      <div className=" sm:hidden text-center mt-15 text-[32px] font-semibold text-main">
        Project Members
      </div>
      <div
        className={` hidden sm:flex items-center justify-center sm:mx-auto md:mx-15   mt-[70px] ${collapsed ? "lg:mx-[100px]" : "lg:mx-10"}`}
      >
        <MembersTable data={data} />
      </div>
      <div className="sm:hidden mt-5">
        <MobileMembersCard data={data} />
      </div>
    </main>
  );
}
