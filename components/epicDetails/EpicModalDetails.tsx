"use client";

import {
  setOpenEpicModal,
  setSelectedEpicId,
} from "@/app/store/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import useLockBodyScroll from "@/customHooks/useLockBodyScroll";
import { getOneEpicAction } from "@/server-actions/epics/getOneEpic";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import HeaderEpicDetails from "./HeaderEpicDetails";
import EpicMainInfo from "./EpicMainInfo";
import EmptyTasks from "./EmptyTasks";
import { Epic } from "@/hooks/useGetAllEpics";

export type UserInfo = {
  sub: string;
  name: string;
  email: string;
  department: string | null;
};

export type EpicDetails = {
  id: string;
  epic_id: string;
  project_id: string;

  title: string;
  description: string;

  deadline: string;
  created_at: string;

  assignee: UserInfo;
  created_by: UserInfo;
};

type Props = {
  epics: Epic[];
  setEpics: React.Dispatch<React.SetStateAction<Epic[]>>;
};

export default function EpicModalDetails({ epics, setEpics }: Props) {
  const params = useParams();
  const projectId = params.projectId as string;

  const dispatch = useAppDispatch();

  const { openEpicModal: open, selectedEpicId } = useAppSelector(
    (state) => state.ui,
  );

  const [epic, setEpic] = useState<EpicDetails | null>(null);

  const fetchEpic = async () => {
    try {
      if (!selectedEpicId) return;

      const query = {
        projectId,
        epicId: selectedEpicId,
      };

      const data = await getOneEpicAction(query);
      setEpic(data[0]);
    } catch (error) {
      console.error("Error fetching epic:", error);
    }
  };

  useEffect(() => {
    if (!selectedEpicId) return;

    fetchEpic();
  }, [selectedEpicId]);

  useLockBodyScroll(open);

  const handleClose = () => {
    setEpic(null);
    dispatch(setSelectedEpicId(null));
    dispatch(setOpenEpicModal(false));
  };

  if (!open) return null;

  if (!epic) return null;
  console.log(epic);
  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center">
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-[#041B3C33] backdrop-blur-[2px]"
      />

      <div className="relative z-10 mx-4 w-full max-w-[672px] max-h-[95vh] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
        <div className="overflow-y-auto">
          <>
            <HeaderEpicDetails setEpics={setEpics} epic={epic} />
            <EpicMainInfo setEpics={setEpics} epic={epic} />
            <EmptyTasks />
          </>
        </div>
      </div>
    </div>
  );
}
