"use client";
import React from "react";
import HeaderMembers from "./HeaderMembers";
import { useProjectForm } from "@/hooks/useProjectForm";
import MembersTable from "./MembersTable";
import { useMembersProject } from "@/hooks/useMembersProject";
import ErrorNetworkState from "../projects/ErrorNetworkState";
import MembersPageSkeleton from "../skeleton/MembersPageSkeleton";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import MobileMembersCard from "./MobileMembersCard";
import MobileMembersSkeleton from "../skeleton/MobileMembersSkeleton";
import InviteModal from "./InviteModal";
import PlusIcon from "../icons/PlusIcon";
import { setOpenInviteModal } from "@/app/store/features/ui/uiSlice";

export default function MembersMain() {
  const { initialProject } = useProjectForm();
  const { data, retryLoading, status, retryGetMembersProject, error } = useMembersProject();

  const isLoading = status === "loading" || !initialProject;
  const isError = status === "error";
  const { sidebarCollapsed: collapsed, openInviteModal } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
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
        className={` hidden sm:flex items-center justify-center sm:mx-auto md:mx-15   mt-[20px] ${collapsed ? "lg:mx-[100px]" : "lg:mx-10"}`}
      >
        <MembersTable data={data} />
      </div>
      <div className="sm:hidden mt-5">
        <MobileMembersCard data={data} />
      </div>
      <div
        onClick={() => dispatch(setOpenInviteModal(true))}
        className="sm:hidden fixed bottom-20 right-6 z-500"
      >
        <button className="btn-primary rounded-lg py-7 px-6 flex items-center justify-center gap-2">
          <PlusIcon />
        </button>
      </div>
      {openInviteModal && <InviteModal />}
    </main>
  );
}
