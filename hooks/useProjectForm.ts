"use client";

import addNewProjectAction from "@/app/server-actions/project/addNewProject";
import { editOneProjectAction } from "@/app/server-actions/project/editOneProject";
import { getOneProjectAction } from "@/app/server-actions/project/getOneProject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";



const schema = z.object({
  name: z.string().min(3),
  description: z.string().max(500).optional(),
});

export type ProjectFormData = z.infer<typeof schema>;

type Project = {
  id: string;
  name: string;
  description?: string | null;
};

export const useProjectForm = (mode?: string) => {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  const [initialProject, setInitialProject] = useState<Project | null>(null);
  const [loadingProject, setLoadingProject] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (mode === "add") return;
    if (!projectId) return;

    const load = async () => {
      try {
        setLoadingProject(true);

        const res = await getOneProjectAction(projectId);
        const project = res?.[0];

        if (!project) return;

        setInitialProject(project);

        form.reset({
          name: project.name,
          description: project.description ?? "",
        });
      } catch (e) {
        toast.error("Failed to load project");
      } finally {
        setLoadingProject(false);
      }
    };

    load();
  }, [mode, projectId]);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsLoading(true);

      const body = {
        name: data.name,
        description: data.description || undefined,
      };
      console.log(data);
      if (mode !== "add") {
        await editOneProjectAction(projectId, body);
        toast.success("Project updated successfully");
        router.push("/project");
      } else {
        await addNewProjectAction(body);
        toast.success("Project created successfully");
        form.reset();
      }
    } catch (err: any) {
      toast.error(err.message || "Error saving project");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    initialProject,
    loadingProject,
  };
};
