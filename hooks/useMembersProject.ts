"use client";
import { getMembersProjectAction } from "@/server-actions/members/getMembersProject";
import { ProjectMember } from "@/components/projectMembers/MembersTable";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectMemberFormData, projectMemberSchema } from "@/schema/projectMember.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { AddProjectMemberAction } from "@/server-actions/members/addProjectMember";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setOpenInviteModal } from "@/app/store/features/ui/uiSlice";
import { AcceptInvitationAction } from "@/server-actions/members/acceptInvitation";

type Status = "loading" | "success" | "error";

export const useMembersProject = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [retryLoading, setRetryLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<ProjectMemberFormData>({
    resolver: zodResolver(projectMemberSchema),
    defaultValues: {
      email: "",
    },
  });

  const { user } = useAppSelector((state) => state.auth);
  const fetchMembersProject = async (projectId: string) => {
    return await getMembersProjectAction(projectId);
  };
  const getAllMembersProject = async (projectId: string) => {
    try {
      setStatus("loading");
      setError(null);
      const result = await fetchMembersProject(projectId);
      console.log(result);
      setData(result);
      setStatus("success");
    } catch (err: any) {
      setError(
        err?.message || "Failed to load project members. Please try again." || "Network Error"
      );
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!projectId) return;
    getAllMembersProject(projectId);
  }, [projectId]);

  const retryGetMembersProject = async () => {
    try {
      if (!projectId) return;
      setRetryLoading(true);
      const result = await fetchMembersProject(projectId);

      setData(result);
      setError(null);
      setStatus("success");
    } catch (err: any) {
      setError(
        err?.message || "Failed to load project members. Please try again." || "Network Error"
      );
    } finally {
      setRetryLoading(false);
    }
  };

  const onSubmit = async (data: ProjectMemberFormData) => {
    try {
      setLoading(true);
      const body = {
        p_email: data.email,
        p_project_id: projectId,
        p_app_url: process.env.NEXT_PUBLIC_FRONTEND_URL as string,
        p_base_url: process.env.NEXT_PUBLIC_BASE_URL as string,
      };
      console.log(body);
      await AddProjectMemberAction(body);
      toast.success("Invitation sent successfully");
    } catch (error: any) {
      toast.error(error.message || "Error in network or internal server error");
    } finally {
      setLoading(false);
      dispatch(setOpenInviteModal(false));
    }
  };

  const handleAcceptInvitation = async (token: string) => {
    try {
      setLoading(true);
      if (!user) {
        router.replace("/login");
        toast.error("you are not logged in");
        router.replace(`/login?redirect=${encodeURIComponent(`/invite?token=${token}`)}`);
        return;
      }
      const data = await AcceptInvitationAction({
        p_token: token,
      });
      console.log(data);
      toast.success("Invitation accepted successfully");
      router.push("/project");
    } catch (error: any) {
      toast.error(error.message || "Error in network or internal server error");
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    status,
    error,
    retryLoading,
    retryGetMembersProject,
    onSubmit,
    form,
    loading,
    handleAcceptInvitation,
  };
};
