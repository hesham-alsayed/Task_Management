"use client";

import FormProject from "./FormProject";
import FooterProject from "./FooteProject";
import ProjectPageSkeleton from "../skeleton/projectPageSkeleton";
import { useProjectForm } from "@/hooks/useProjectForm";
import InviteMemberIcon from "../icons/InviteMemberIcon";
import HeaderPage from "./HeaderPage";

type Props = {
  mode: "add" | "edit";
};

export default function ProjectForm({ mode }: Props) {
  const { form, onSubmit, isLoading, loadingProject, initialProject } =
    useProjectForm(mode);

  if (mode === "edit" && loadingProject) {
    return <ProjectPageSkeleton />;
  }
  const currentLoactionEdit = [
    { label: "projects", href: "/project" },
    {
      label: initialProject?.name || "",
      href: `/project/${initialProject?.id}/epics`,
    },
    { label: "Edit" },
  ];
  const currentLocationAdd = [
    { label: "projects", href: "/project" },
    { label: "Add" },
  ];

  const items = mode === "edit" ? currentLoactionEdit : currentLocationAdd;
  return (
    <div className="p-2">
      <HeaderPage
        title={mode === "edit" ? "Edit Project" : "Add New Project"}
        buttonText="invite members"
        buttonIcon={<InviteMemberIcon />}
        items={items}
      />

      <div className="sm:max-w-240 w-full max-h-176 h-full mt-5 rounded-lg p-1 mx-auto">
        <div className="max-w-2xl w-full mx-auto rounded-lg sm:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <FormProject
            mode={mode}
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
          <FooterProject />
        </div>
      </div>
    </div>
  );
}
