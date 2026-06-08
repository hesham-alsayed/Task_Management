"use client";

import addNewProjectAction from "@/app/server-actions/projects/addNewProject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Project title must be at least 3 characters" }),
  description: z
    .string()
    .max(500, { message: "Description must not exceed 500 characters" })
    .optional(),
});

export type CreateProjectFormData = z.infer<typeof schema>;

export const useAddNewProjectForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateProjectFormData) => {
    try {
      const body = {
        name: data.name,
        description: data.description?.length ? data.description : undefined,
      };
      setIsLoading(true);
      await addNewProjectAction(body);
      toast.success("Project created successfully");
      form.reset();
    } catch (error: any) {
      const message =
        error.message || error.msg || "Error in create new project";
      toast.error(message);
    }
    setIsLoading(false);
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
};
