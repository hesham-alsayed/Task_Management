"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import toast from "react-hot-toast";
import { z } from "zod";

import { getOneEpicAction } from "@/server-actions/epics/getOneEpic";
import { updateEpicAction } from "@/server-actions/epics/updateEpic";
import { Epic, useGetAllEpics } from "./useGetAllEpics";
import { setAllEpics } from "@/app/store/features/epics/epicsSlice";
import { addNewEpicAction } from "@/server-actions/epics/addNewEpic";

const schema = z.object({
  title: z.string().trim().min(3, { message: "Title is required (minimum 3 characters)" }),
  description: z.string().max(500, { message: "Description (maximun 500 characters)" }).optional(),
  assignee_id: z.string().optional(),
  deadline: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;

        const selected = new Date(value);
        const today = new Date();

        selected.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return selected >= today;
      },
      {
        message: "Deadline must be today or a future date",
      }
    ),
});

export type RequestEpicBody = {
  title: string;
  description?: string;
  assignee_id?: string;
  project_id: string;
  deadline?: string;
};

export type EpicForm = z.infer<typeof schema>;
type Field = keyof EpicForm;

export function useEpicForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loadinitialData } = useGetAllEpics();

  const selectedEpicId = useAppSelector((s) => s.ui.selectedEpicId);
  const params = useParams();
  const projectId = params.projectId as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [epic, setEpic] = useState<Epic | null>(null);

  const form = useForm<EpicForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      assignee_id: "",
      deadline: "",
    },
  });

  const { getValues } = form;

  const fetchEpic = async () => {
    try {
      if (!selectedEpicId) return;
      setFetching(true);
      const data = await getOneEpicAction({
        projectId,
        epicId: selectedEpicId,
      });

      const epic = data?.[0];
      form.reset({
        title: epic?.title ?? "",
        description: epic?.description ?? "",
        assignee_id: epic?.assignee.sub ?? "",
        deadline: epic?.deadline ?? "",
      });
      setEpic(epic);
    } catch (error) {
      toast.error("Failed to fetch epic");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchEpic();
  }, [selectedEpicId]);

  const normalizeValue = (value: unknown) => {
    if (value === "" || value === undefined) return null;
    return value;
  };
  const updateField = async (field: Field, value: string | null) => {
    if (!selectedEpicId) return;

    const current = getValues(field);
    if (current === value) return;

    try {
      setLoading(true);

      const res = await updateEpicAction(selectedEpicId, {
        [field]: normalizeValue(value),
      });

      if (!res?.success) {
        toast.error(`Failed to update ${field}`);
        return;
      }

      const data = await loadinitialData();
      dispatch(setAllEpics(data));
      toast.success(`Updated ${field} successfully`);
    } catch {
      toast.error(`Failed to update ${field}`);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EpicForm) => {
    try {
      if (!projectId) return;
      setLoading(true);
      const body: RequestEpicBody = {
        title: data.title,
        description: data.description ? data.description : undefined,
        assignee_id: data.assignee_id ? data.assignee_id : undefined,
        project_id: projectId,
        deadline: data.deadline ? data.deadline : undefined,
      };
      console.log(body);
      await addNewEpicAction(body);
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
      values.assignee_id?.trim() ||
      values.deadline?.trim();
    if (!hasValues) return;
    form.reset({
      assignee_id: "",
      deadline: "",
      description: "",
      title: "",
    });
  };

  return {
    form,
    updateField,
    loading,
    fetching,
    epic,
    fetchEpic,
    onSubmit,
    handleResetForm,
  };
}
