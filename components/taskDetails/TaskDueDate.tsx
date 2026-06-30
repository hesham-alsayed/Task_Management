"use client";
import { Field } from "@/hooks/useTaskForm";
import { NewTaskFormData } from "@/schema/task.schema";
import  { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import DateEpicIcon from "../icons/DateEpicIcon";
import { formatDate } from "@/lib/helper/formate-date";
import DateIcon from "../icons/DateIcon";

type Props = {
  updateField: (field: Field, value: string | null) => Promise<void>;
  mobile?: boolean;
};
export default function TaskDueDate({ updateField, mobile = false }: Props) {
  const {
    control,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext<NewTaskFormData>();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const openPicker = () => {
    if (loading) return;

    const input = inputRef.current;
    if (!input) return;

    input.focus();
    input.showPicker?.();
  };
  const handleSave = async (value: string) => {
    try {
      console.log(value);
      const isValid = await trigger("due_date");
      if (!isValid) {
        toast.error(errors.due_date?.message || "Invalid due date");
        return;
      }
      setLoading(true);
      await updateField("due_date", value);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-1 relative">
      {!mobile && (
        <span className="text-[12px] text-[#434654] font-normal capitalize">due date</span>
      )}
      <Controller
        name="due_date"
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
              {mobile ? <DateIcon color="#003D9B" /> : <DateEpicIcon />}

              <span className={`${mobile ? "text-[13px]" : "text-sm"} font-medium text-main`}>
                {value ? formatDate(value) : "No Due Date"}
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
                className="absolute inset-0 opacity-0 pointer-events-none"
              />
            </div>
          );
        }}
      />
    </div>
  );
}
