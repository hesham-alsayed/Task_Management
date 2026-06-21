"use client";

import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

import DateEpicIcon from "../icons/DateEpicIcon";
import { formatDate } from "@/lib/helper/formate-date";
import { EpicForm, useEpicForm } from "@/hooks/useEpicForm";

export default function EpicDeadline() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { loading, updateField } = useEpicForm();

  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<EpicForm>();

  const openPicker = () => {
    if (loading) return;

    const input = inputRef.current;
    if (!input) return;

    input.focus();
    input.showPicker?.();
  };

  const handleSave = async (value: string) => {
    const isValid = await trigger("deadline");

    if (!isValid) {
      toast.error(errors.deadline?.message || "Invalid deadline");
      return;
    }

    await updateField("deadline", value);
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="uppercase text-[10px] font-bold text-[#4F5F7B]">Deadline</span>

      <Controller
        name="deadline"
        control={control}
        render={({ field }) => {
          const value = field.value ?? "";

          return (
            <div
              className={`
    flex items-center gap-2 mt-2
    ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `}
              onClick={openPicker}
            >
              <DateEpicIcon />

              <span className="text-sm font-medium text-main">
                {value ? formatDate(value) : "No Deadline"}
              </span>

              <input
                ref={inputRef}
                type="date"
                value={value}
                min={new Date().toISOString().split("T")[0]}
                disabled={loading}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  handleSave(e.target.value);
                }}
                className="absolute opacity-0 w-1 h-1 pointer-events-none"
              />
            </div>
          );
        }}
      />

      {errors.deadline && <p className="text-xs text-red-500 mt-1">{errors.deadline.message}</p>}
    </div>
  );
}
