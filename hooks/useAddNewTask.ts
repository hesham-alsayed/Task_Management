"use client";

import { useAppSelector } from "@/app/store/hooks";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useMembersProject } from "./useMembersProject";

import { Epic } from "./useGetAllEpics";
import { formatEpicTitle } from "@/lib/helper/formatEpicTitle";
import { ProjectMember } from "@/components/projectMembers/MembersTable";
import { getAllEpicsAction } from "@/server-actions/epics/getAllEpicList";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewTaskAction } from "@/server-actions/tasks/addNewTask";
import { taskSchema, NewTaskFormData } from "../schema/task.schema"; 

export type MemberOptions = {
  value: string | null;
  label: string;
};

export type EpicOptions = {
  value: string | null;
  label: string;
};

export const useAddNewTask = () => {
  const { data: members } = useMembersProject();

  const { selectedEpicId } = useAppSelector((state) => state.ui);
  const params = useParams();
  const projectId = params.projectId as string;
  const [loadingEpics, setLoadingEpics] = useState(false);

  const [epics, setEpics] = useState<any[]>([]);
  const reduxEpic = epics.find((item) => item.id === selectedEpicId);
  const [epic, setEpic] = useState<Epic | null>(reduxEpic ?? null);
  const [loading, setLoading] = useState(false);
  const form = useForm<NewTaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      epic_id: null,
      description: null,
      assignee_id: null,
      due_date: null,
      status: "TO_DO",
      project_id: projectId,
    },
  });

  useEffect(() => {
    if (epic?.id) {
      form.setValue("epic_id", String(epic.id));
    }
  }, [epic?.id, form]);

  useEffect(() => {
    if (!reduxEpic) return;

    localStorage.setItem("epic", JSON.stringify(reduxEpic));
    setEpic(reduxEpic);
  }, [reduxEpic]);

  useEffect(() => {
    if (reduxEpic) return;

    const storedEpic = localStorage.getItem("epic");

    if (storedEpic) {
      setEpic(JSON.parse(storedEpic));
    }
  }, [reduxEpic]);

  const getEpics = async () => {
    try {
      setLoadingEpics(true);

      const result = await getAllEpicsAction({
        projectId,
      });

      setEpics(result.data || []);
    } catch (err: any) {
      toast.error(err.message || "Error when fetch Project Epics");
    } finally {
      setLoadingEpics(false);
    }
  };

  useEffect(() => {
    if (!projectId) return;
    getEpics();
  }, [projectId]);

  const membersOptions: MemberOptions[] = useMemo(() => {
    return [
      {
        value: null,
        label: "Unassigned",
      },
      ...(members?.map((member: ProjectMember) => ({
        value: member.user_id,
        label: member.metadata.name,
      })) || []),
    ];
  }, [members]);

  const epicOptions: EpicOptions[] = useMemo(() => {
    return [
      {
        value: null,
        label: "No Epic",
      },
      ...epics.map((epic: any) => ({
        value: epic.id,
        label: `${epic.id}  ${formatEpicTitle(epic.title)}`,
      })),
    ];
  }, [epics]);

  const onSubmit = async (data: NewTaskFormData) => {
    try {
      setLoading(true);
      await addNewTaskAction(data);
      form.reset({
        title: "",
        epic_id: null,
        description: null,
        assignee_id: null,
        due_date: null,
        status: "TO_DO",
        project_id: projectId,
      });
      toast.success("task created successfully");
    } catch (error: any) {
      toast.error(error.message || "Error in network or internal server error");
    } finally {
      setLoading(false);
    }
  };

  console.log("Epic:", epic);
  return {
    epic,
    membersOptions,
    epicOptions,
    loadingEpics,
    form,
    onSubmit,
    loading,
  };
};
