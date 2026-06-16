"use client";

import React, { useState } from "react";
import EpicIcon from "../icons/EpicIcon";
import { EpicDetails } from "./EpicModalDetails";
import CloseIcon from "../icons/CloseIcon";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setOpenEpicModal,
  setSelectedEpicId,
} from "@/app/store/features/ui/uiSlice";
import { updateEpicAction } from "@/server-actions/epics/updateEpic";
import { Epic } from "@/hooks/useGetAllEpics";
import toast from "react-hot-toast";

type Props = {
  epic: EpicDetails;
  setEpics: React.Dispatch<React.SetStateAction<Epic[]>>;
};

export default function HeaderEpicDetails({ epic , setEpics }: Props) {
  const { epic_id, title } = epic;

  const dispatch = useAppDispatch();
  const { selectedEpicId } = useAppSelector((state) => state.ui);

  const [value, setValue] = useState(title);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveChange = async () => {
    setIsFocused(false);

    if (!selectedEpicId) return;

    const prevTitle = epic.title;
    const newTitle = value;

    setEpics((prev) =>
      prev.map((item) =>
        item.id === selectedEpicId
          ? {
              ...item,
              title: newTitle,
            }
          : item,
      ),
    );

    setLoading(true);

    const res = await updateEpicAction(selectedEpicId, {
      title: newTitle,
    });

    if (!res?.success) {
      setEpics((prev) =>
        prev.map((item) =>
          item.id === selectedEpicId
            ? {
                ...item,
                title: prevTitle,
              }
            : item,
        ),
      );

      setValue(prevTitle); 
      toast.error("Failed to update epic. Please try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success("Epic updated successfully");
  };
  return (
    <div className="space-y-3 md:border-b p-6 rounded-t-xl max-md:bg-[#F1F3FF] md:border-b-[#7a7a7a26] md:pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="hidden md:block">
            <EpicIcon />
          </span>

          <span className="text-[12px] font-bold max-md:text-[#003D9B] text-[#041B3C99]">
            {epic_id}
          </span>
        </div>

        <button
          onClick={() => {
            dispatch(setSelectedEpicId(null));
            dispatch(setOpenEpicModal(false));
          }}
          className="cursor-pointer"
        >
          <CloseIcon />
        </button>
      </div>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleSaveChange}
        disabled={loading} 
        className={`
          w-full
          text-[24px]
          font-bold
          text-main
          border-b
          border-transparent
          transition-all
          duration-200
          outline-none
          ${isFocused ? "border-b-2 border-[#7a7a7a26]" : "border-transparent"}
        `}
      />
    </div>
  );
}
