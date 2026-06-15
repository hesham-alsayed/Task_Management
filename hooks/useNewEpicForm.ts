import { addNewEpicAction } from "@/app/server-actions/epics/addNewEpic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const newEpicSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title is required (minimum 3 characters)" }),
  description: z
    .string()
    .max(500, { message: "Description (maximun 500 characters)" })
    .optional(),
  assignee: z.string().optional(),
  deadline: z.string().optional(),
});

export type NewEpicFormData = z.infer<typeof newEpicSchema>;

export type RequestEpicBody = {
  title: string;
  description?: string;
  assignee_id?: string;
  project_id: string;
  deadline?: string;
};
export const useNewEpicForm = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();
  const form = useForm<NewEpicFormData>({
    resolver: zodResolver(newEpicSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee: "",
      deadline: "",
    },
  });

  const onSubmit = async (data: NewEpicFormData) => {
    try {
      console.log({
        assignee: data.assignee,
        type: typeof data.assignee,
      });

      if (!projectId) return;
      setLoading(true);
      const body: RequestEpicBody = {
        title: data.title,
        description: data.description ? data.description : undefined,
        assignee_id: data.assignee ? data.assignee : undefined,
        project_id: projectId,
        deadline: data.deadline ? data.deadline : undefined,
      };
      console.log(body);
      const result = await addNewEpicAction(body);
      console.log(result);
      toast.success("new Epic Created successfully");
      form.reset({});
      router.push(`/project/${projectId}/epics`);
    } catch (error: any) {
      toast.error(error.message || "Error in network or internal server error");
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    const values = form.getValues();

    const hasValues =
      values.title?.trim() ||
      values.description?.trim() ||
      values.assignee?.trim() ||
      values.deadline?.trim();
    if (!hasValues) return;
    form.reset({
      assignee: "",
      deadline: "",
      description: "",
      title: "",
    });
  };
  return {
    loading,
    form,
    onSubmit,
    handleResetForm,
  };
};
