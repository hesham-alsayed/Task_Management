"use client";
import React from "react";
import HeaderProject from "../projects/HeaderProject";
import HeaderPage from "../shared/HeaderPage";
import InviteMemberIcon from "../icons/InviteMemberIcon";
import { useAppDispatch } from "@/app/store/hooks";
import { setOpenInviteModal } from "@/app/store/features/ui/uiSlice";

type Props = {
  projectName: string;
  projectId: string;
};
export default function HeaderMembers({ projectId, projectName }: Props) {
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(setOpenInviteModal(true));
  };
  const items = [
    { label: "projects", href: "/project" },
    {
      label: projectName || "",
      href: `/project/${projectId}/edit`,
    },
    { label: "members" },
  ];

  return (
    <HeaderPage
      items={items}
      title="Project Members"
      buttonText="invite members"
      buttonIcon={<InviteMemberIcon />}
      onButtonClick={handleOpenModal}
    />
  );
}
