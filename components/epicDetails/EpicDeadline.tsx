"use client";

import React, { useEffect, useRef, useState } from "react";
import DateEpicIcon from "../icons/DateEpicIcon";
import { formatDate } from "@/lib/helper/formate-date";
import { updateEpicAction } from "@/server-actions/epics/updateEpic";
import { useAppSelector } from "@/app/store/hooks";
import toast from "react-hot-toast";

type Props = {
  deadlineValue: string;
  setDedlineValue: React.Dispatch<React.SetStateAction<string>>;
  editingDeadline: boolean;
  setEditingDeadline: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EpicDeadline({
  deadlineValue,
  setDedlineValue,
  editingDeadline,
  setEditingDeadline,
}: Props) {
  const deadlineRef = useRef<HTMLInputElement>(null);

  const { selectedEpicId } = useAppSelector((state) => state.ui);

  const [loading, setLoading] = useState(false);
  const prevRef = useRef(deadlineValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        deadlineRef.current &&
        !deadlineRef.current.contains(event.target as Node)
      ) {
        setEditingDeadline(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setEditingDeadline]);

  const handleSave = async (value: string) => {
    if (loading) return; // ✅ prevent double calls

    setDedlineValue(value);
    setEditingDeadline(false);

    if (!selectedEpicId) return;

    const prevValue = prevRef.current;

    if (value === prevValue) {
      setEditingDeadline(false);
      return;
    }

    setLoading(true);

    const res = await updateEpicAction(selectedEpicId, {
      deadline: value || null,
    });

    if (!res?.success) {
      setDedlineValue(prevValue);
      toast.error("Failed to update epic. Please try again.");
      setLoading(false);
      return;
    }

    prevRef.current = value;
    toast.success("Epic updated successfully");

    setLoading(false);
  };

  return (
    <div>
      <span className="uppercase text-[10px] font-bold text-[#4F5F7B]">
        Deadline
      </span>

      {editingDeadline ? (
        <div
          className={`transition-opacity ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <input
            ref={deadlineRef}
            type="date"
            value={deadlineValue}
            disabled={loading}
            onChange={(e) => handleSave(e.target.value)}
            onFocus={(e) => !loading && e.currentTarget.showPicker?.()}
            className={`border-none focus:outline-none focus:ring-0 ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          />
        </div>
      ) : (
        <div
          onClick={() => !loading && setEditingDeadline(true)}
          className={`flex items-center gap-2 mt-2 ${
            loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <DateEpicIcon />

          <span className="text-sm font-medium">
            {formatDate(deadlineValue)}
          </span>
        </div>
      )}
    </div>
  );
}
