"use client";

import ExclamationIcon from "../icons/ExclamationIcon";

type Props = {
  error: string;
};
export default function ErrorTasksState({ error }: Props) {
  return (
    <div className=" m-6 flex flex-col items-center justify-center py-14 text-center rounded-xl border border-red-100 bg-red-50">
      <h2 className="text-[#BA1A1A] font-semibold text-sm flex items-center gap-3">
        <ExclamationIcon /> Failed to load tasks
      </h2>

      <p className="text-gray-500 text-xs mt-2 max-w-xs">{error}</p>
    </div>
  );
}
