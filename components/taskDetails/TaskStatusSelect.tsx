"use client";

import { statusTasksOptions } from "@/lib/constant";
import { NewTaskFormData } from "@/schema/task.schema";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import DropDownIcon from "../icons/DropDownIcon";
import { Field } from "@/hooks/useTaskForm";

type Props = {
  updateField: (field: Field, value: string | null) => Promise<void>;
};

export default function TaskStatusSelect({ updateField }: Props) {
  const { watch, setValue } = useFormContext<NewTaskFormData>();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const value = watch("status");

  const selectedStatus = statusTasksOptions.find((status) => status.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangeStatus = async (status: string) => {
    if (loading || status === value) {
      setIsOpen(false);
      return;
    }

    try {
      setValue("status", status);
      setIsOpen(false);
      setLoading(true);

      await updateField("status", status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <span
        style={{
          lineHeight: "16px",
          letterSpacing: "1px",
        }}
        className="mb-6 text-[11px] font-bold uppercase text-[#434654]"
      >
        Status
      </span>

      <div ref={dropdownRef} className="relative mt-3 w-full">
        <button
          type="button"
          disabled={loading}
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            backgroundColor: selectedStatus?.bg,
            color: selectedStatus?.color,
          }}
          className={`
            flex
            w-full
            items-center
            justify-between
            gap-3
            rounded-md
            px-3
            py-3
            border border-gray-200
            text-xs
            font-bold
            uppercase
            transition
            ${loading ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:opacity-90"}
          `}
        >
          <span>{selectedStatus?.label}</span>

          <DropDownIcon />
        </button>

        <div
          className={`absolute left-0 top-11 z-50 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 ${
            isOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
          }`}
        >
          <ul className="divide-y divide-gray-100">
            {statusTasksOptions.map((status) => (
              <button
                key={status.value}
                type="button"
                disabled={loading}
                onClick={() => handleChangeStatus(status.value)}
                className=" hover:cursor-pointer
              w-full
              px-4
              py-3
              text-left
              text-sm
              font-medium
              text-[#434654]
              transition-colors
              duration-150
              hover:bg-[#F5F7FA]
              hover:text-primary
            "
              >
                {status.label}
              </button>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
