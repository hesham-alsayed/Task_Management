"use client";

import React, { useState } from "react";
import { EpicForm, useEpicForm } from "@/hooks/useEpicForm";
import { useFormContext } from "react-hook-form";
import EpicIcon from "../icons/EpicIcon";
import CloseIcon from "../icons/CloseIcon";
import { useAppDispatch } from "@/app/store/hooks";
import { setOpenEpicModal, setSelectedEpicId } from "@/app/store/features/ui/uiSlice";
import ExclamationIcon from "../icons/ExclamationIcon";

export default function HeaderEpicDetails() {
  const { updateField, loading } = useEpicForm();

  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<EpicForm>();

  const dispatch = useAppDispatch();
  const [isFocused, setIsFocused] = useState(false);

  const value = watch("title");
  const hasError = !!errors.title;

  const handleChangeValue = async () => {
    setIsFocused(false);

    const isValid = await trigger("title");

    if (!isValid) return;

    updateField("title", value);
  };

  return (
    <div className="space-y-3 p-6">
      <div className="flex justify-between">
        <EpicIcon />

        <button
          onClick={() => {
            dispatch(setSelectedEpicId(null));
            dispatch(setOpenEpicModal(false));
          }}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="relative">
        <input
          {...register("title")}
          onFocus={() => setIsFocused(true)}
          onBlur={handleChangeValue}
          disabled={loading}
          className={`
            w-full text-[24px] font-bold outline-none border-b pr-6
            transition-all

            ${loading ? "opacity-50" : ""}

            ${hasError ? "border-red-500 " : isFocused ? "border-gray-300" : "border-transparent"}
          `}
        />

        {hasError && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 ">
            <ExclamationIcon />
          </span>
        )}
      </div>

      {hasError && <p className="text-xs text-red-500 font-medium">{errors.title?.message}</p>}
    </div>
  );
}
