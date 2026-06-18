"use client";

import  { useRef, useState } from "react";
import { updateEpicAction } from "@/server-actions/epics/updateEpic";
import { useAppSelector } from "@/app/store/hooks";
import toast from "react-hot-toast";

type Props = {
  initialValue: string;
};

export default function EpicDescription({ initialValue }: Props) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { selectedEpicId } = useAppSelector((state) => state.ui);
  const initialValueRef = useRef(initialValue);

  const handleSave = async () => {
    setIsFocused(false);

    if (value === initialValueRef.current) return;
    if (!selectedEpicId) return;

    const prev = value;

    setLoading(true);

    const res = await updateEpicAction(selectedEpicId, {
      description: value,
    });

    if (!res?.success) {
      setValue(prev);
      toast.error("Failed to update epic. Please try again.");
      setLoading(false);
      return;
    }

    initialValueRef.current = value;

    setLoading(false);
    toast.success("Epic updated successfully");
  };

 

  return (
    <div className="space-y-4">
      <p className="uppercase text-[11px] font-bold text-[#4F5F7B]">
        Description
      </p>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => !loading && setIsFocused(true)}
        onBlur={handleSave}
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
