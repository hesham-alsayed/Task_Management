import TaskDetailsIcon from "@/components/icons/TaskDetailsIcon";
import ExclamationIcon from "../icons/ExclamationIcon";
import { NewTaskFormData } from "@/schema/task.schema";
import { BoardItem, ITaskDetails } from "@/types/task";
import { useFormContext } from "react-hook-form";
import { Field } from "@/hooks/useTaskForm";
import { useEffect, useRef, useState } from "react";
import { Epic } from "@/hooks/useGetAllEpics";
import ArrowMenu from "../shared/ArrowMenu";
import DropDownIcon from "../icons/DropDownIcon";

type Props = {
  task: ITaskDetails | null;
  updateField: (field: Field, value: string | null) => Promise<void>;
  epics: Epic[];
};

export default function TaskDetailsHeader({ task, updateField, epics }: Props) {
  const {
    register,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useFormContext<NewTaskFormData>();

  const [isOpen, setIsOpen] = useState(false);
  const title = watch("title");
  const selectedEpicId = watch("epic_id");
  console.log(selectedEpicId);
  const selectedEpic = epics.find((epic) => epic.id === selectedEpicId);
  const hasError = !!errors.title;

  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingEpic, setLoadingEpic] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
   const handleChangeValue = async () => {
    setIsFocused(false);

    const isValid = await trigger("title");
    if (!isValid) return;

    try {
      setLoading(true);
      await updateField("title", title ?? "");
    } finally {
      setLoading(false);
    }
  };

  console.log(epics);
  const epicOptions = epics.map((epic) => ({
    value: epic.id,
    label: `${epic.epic_id} (${epic.title})`,
  }));

  const handleChangeEpic = async (epicId: string) => {
    try {
      setValue("epic_id", epicId);
      setIsOpen(false);
      setLoadingEpic(true);
      await updateField("epic_id", epicId);
    } finally {
      setLoadingEpic(false);
    }
  };
  return (
    <div className="space-y-3 px-8 py-6 pb-10">
      <div className="flex items-center gap-6">
        <div className="bg-[#DAE2FF] w-20 h-5 rounded-sm flex items-center justify-center px-2 py-0.5 text-[12px] font-bold text-[#003D9B]">
          {task?.task_id}
        </div>

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`  ${loadingEpic ? "opacity-50 cursor-not-allowed" : "cursor-text"} flex items-center gap-2 w-80 rounded-md px-2 py-1 hover:bg-gray-100 hover:cursor-pointer transition`}
          >
            <span className="text-sm font-medium text-[#434654]">
              {selectedEpic
                ? `${selectedEpic.epic_id} (${selectedEpic.title})`
                : "No Epic Selected"}
            </span>

            <span className="ml-auto">
              <DropDownIcon />
            </span>
          </button>
          <div
            className={`absolute top-11 left-0 z-50 w-80 max-h-[350px] overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 origin-top ${
              isOpen
                ? "visible translate-y-0 scale-100 opacity-100"
                : "invisible -translate-y-2 scale-95 opacity-0"
            }`}
          >
            {epicOptions.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {epicOptions.map((epic) => (
                  <li key={epic.value}>
                    <button
                      onClick={(e) => handleChangeEpic(epic.value)}
                      type="button"
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
                      {epic.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-6 text-center text-sm font-medium text-gray-500">No Epics</p>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <input
          {...register("title")}
          onFocus={() => setIsFocused(true)}
          onBlur={handleChangeValue}
          disabled={loading}
          className={`
            w-full pr-6 text-[24px] font-bold outline-none border-b transition-all duration-200
            ${loading ? "opacity-50 cursor-not-allowed" : "cursor-text"}
            ${hasError ? "border-red-500" : isFocused ? "border-gray-300" : "border-transparent"}
          `}
        />

        {hasError && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2">
            <ExclamationIcon />
          </span>
        )}
      </div>
    </div>
  );
}
