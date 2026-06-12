"use client";
import React from "react";
import HeaderProject from "../projects/HeaderProject";
import HeaderPage from "../shared/HeaderPage";
import InviteMemberIcon from "../icons/InviteMemberIcon";

type Props = {
  projectName: string;
  projectId: string;
};
export default function HeaderMembers({ projectId, projectName }: Props) {
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
    />
  );
}
