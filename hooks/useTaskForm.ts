"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
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
import { ITaskDetails } from "@/types/task";
import { getTaskDetailsAction } from "@/server-actions/tasks/getTaskDetails";
import { updateTaskAction } from "@/server-actions/tasks/updateTask";
import { useProjectTasks } from "./useProjectTasks";
import {
  moveTaskToStatus,
  updateTaskinBoardData,
  updateTaskinListData,
} from "@/app/store/features/tasks/taskSlice";
import { Task } from "@/components/epicDetails/EpicModalDetails";
import { formatDateForInput } from "@/lib/helper/formate-date";

export type MemberOptions = {
  value: string | null;
  label: string;
};

export type EpicOptions = {
  value: string | null;
  label: string;
};

export type Field = keyof NewTaskFormData;
export const useTaskForm = () => {
  const { data: members } = useMembersProject();
  const { selectedEpicId } = useAppSelector((state) => state.ui);
  const params = useParams();
  const projectId = params.projectId as string;
  const [loadingEpics, setLoadingEpics] = useState(false);

  const [epics, setEpics] = useState<any[]>([]);
  const reduxEpic = epics.find((item) => item.id === selectedEpicId);
  const [epic, setEpic] = useState<Epic | null>(reduxEpic ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const { selectedTaskId } = useAppSelector((state) => state.ui);
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view")!!;
  const dispatch = useAppDispatch();

  const [task, setTask] = useState<ITaskDetails | null>(null);
  const [currentTask, setCurrentTask] = useState<NewTaskFormData | null>(null);
  const form = useForm<NewTaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      epic_id: selectedEpicId || null,
      description: null,
      assignee_id: null,
      due_date: null,
      status: "TO_DO",
      project_id: projectId,
    },
  });

  useEffect(() => {
    const storedStatus = localStorage.getItem("selectedStatus");

    if (storedStatus) {
      form.setValue("status", storedStatus as any);
    }
  }, []);

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
      console.log(data);
      setLoading(true);
      await addNewTaskAction(data);
      form.reset({
        title: "",
        description: null,
        assignee_id: null,
        due_date: null,
        project_id: projectId,
      });
      toast.success("task created successfully");
    } catch (error: any) {
      toast.error(error.message || "Error in network or internal server error");
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskDetails = async () => {
    try {
      if (!selectedTaskId) return;
      setLoading(true);
      setError(null);
      const data = await getTaskDetailsAction(projectId, selectedTaskId);
      const taskData = data[0];
      console.log(taskData);
      form.reset({
        title: taskData.title,
        description: taskData.description,
        assignee_id: taskData.assignee.id,
        due_date: formatDateForInput(taskData.due_date),
        status: taskData.status,
        project_id: taskData.project_id || projectId,
        epic_id: taskData.epic_id,
      });

      setTask(taskData);
      setCurrentTask({
        title: taskData.title,
        description: taskData.description,
        assignee_id: taskData.assignee.id,
        due_date: formatDateForInput(taskData.due_date),
        status: taskData.status,
        project_id: taskData.project_id || projectId,
        epic_id: taskData.epic_id,
      });
    } catch {
      setError("Task Id Not Found OR Error in Network");
    } finally {
      setLoading(false);
    }
  };

  const normalizeValue = (value: unknown) => {
    if (value === "" || value === undefined) return null;
    return value;
  };

  const updateField = async (field: Field, value: string | null) => {
    if (!selectedTaskId || !currentTask) return;

    const normalizedValue = normalizeValue(value);

    if (currentTask[field] === normalizedValue) return;

    const previousValue = currentTask[field];

    try {
      setLoadingUpdate(true);

      const res = await updateTaskAction(selectedTaskId, {
        [field]: normalizedValue,
      });

      if (!res?.success) {
        form.setValue(field, previousValue);
        toast.error(`Failed to update ${field}`);
        return;
      }

      setCurrentTask((prev) =>
        prev
          ? {
              ...prev,
              [field]: normalizedValue,
            }
          : prev
      );

      const updatedTask: any = {
        ...task,
        [field]: normalizedValue,
      };
      console.log(updatedTask);
      if (field === "assignee_id") {
        const member = membersOptions.find((m) => m.value === normalizedValue);

        updatedTask.assignee = member
          ? {
              ...task?.assignee,
              id: member.value,
              name: member.label,
            }
          : null;
      }
      console.log(previousValue);
      console.log(normalizedValue);
      if (currentView === "board") {
        if (field === "status") {
          dispatch(
            moveTaskToStatus({
              task: updatedTask,
              oldStatus: previousValue,
            })
          );
        } else {
          dispatch(
            updateTaskinBoardData({
              task: updatedTask,
            })
          );
        }
      } else {
        dispatch(
          updateTaskinListData({
            taskId: selectedTaskId,
            taskData: updatedTask,
          })
        );
      }
      toast.success(`Updated ${field} successfully`);
    } catch {
      form.setValue(field, previousValue);
      toast.error(`Failed to update ${field}`);
    } finally {
      setLoadingUpdate(false);
    }
  };
  return {
    epic,
    membersOptions,
    epicOptions,
    loadingEpics,
    form,
    onSubmit,
    loading,
    fetchTaskDetails,
    task,
    error,
    updateField,
    loadingUpdate,
    epics,
  };
};
