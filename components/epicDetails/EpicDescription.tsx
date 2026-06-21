"use client";

import { useState } from "react";
import { EpicForm, useEpicForm } from "@/hooks/useEpicForm";
import { useFormContext } from "react-hook-form";

export default function EpicDescription() {
  const [isFocused, setIsFocused] = useState(false);
  const { updateField, loading } = useEpicForm();
  const { register, watch } = useFormContext<EpicForm>();
  const value = watch("description");
  return (
    <div className="space-y-4">
      <p className="uppercase text-[11px] font-bold text-[#4F5F7B]">Description</p>

      <textarea
        {...register("description")}
        onBlur={(e) => {
          setIsFocused(false);
          updateField("description", value!!);
        }}
        onFocus={() => setIsFocused(true)}
        disabled={loading}
        className={`w-full text-[16px] min-h-7.5 max-h-20 font-normal text-[#041B3CCC] border-b transition-all duration-200 outline-none resize-none
          ${
            loading
              ? "opacity-50 cursor-not-allowed border-transparent"
              : isFocused
                ? "border-b border-[#7a7a7a26]"
                : "border-transparent cursor-text"
          }
        `}
      />
    </div>
  );
}
