"use client";

import { Field } from "@/hooks/useTaskForm";
import { NewTaskFormData } from "@/schema/task.schema";
import { ITaskDetails } from "@/types/task";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  task: ITaskDetails | null;
  updateField: (field: Field, value: string | null) => Promise<void>;
  mobile?: boolean;
};

export default function TaskDescription({ task, updateField, mobile = false }: Props) {
  const { register, watch } = useFormContext<NewTaskFormData>();

  const value = watch("description");

  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBlur = async () => {
    setIsFocused(false);

    try {
      setLoading(true);
      await updateField("description", value ?? null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={mobile ? "px-8 py-5" : "pt-6 px-8 border-t border-gray-100"}>
      <h3
        className={
          mobile
            ? "text-sm font-bold uppercase text-[#737685]"
            : "text-[11px] font-bold uppercase text-[#434654]"
        }
      >
        Description
      </h3>

      <textarea
        {...register("description")}
        disabled={loading}
        placeholder={!task?.description ? "No Description Found" : ""}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className={`w-full resize-none outline-none transition-all duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""} ${
          mobile
            ? `
                mt-4 min-h-[160px] rounded-lg border border-[#C3C6D61A] bg-white p-4 text-sm font-normal text-[#434654] focus:border-[#C3C6D61A] focus:ring-0
              `
            : `
                mt-2  min-h-8  max-h-24  border-b bg-transparent  py-2 text-sm font-normal text-[#041B3CCC] ${isFocused ? "border-[#7A7A7A26]" : "border-transparent hover:border-[#E5E7EB]"}`
        }
        `}
      />
    </div>
  );
}
