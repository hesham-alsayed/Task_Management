"use client";

import { getStatusStyle } from "@/lib/helper/statusTasks";
import { useParams, useRouter } from "next/navigation";

type StatusType =
  | "TO DO"
  | "IN PROGRESS"
  | "BLOCKED"
  | "IN REVIEW"
  | "READY FOR QA"
  | "REOPENED"
  | "READY FOR PRODUCTION"
  | "DONE";

type Props = {
  status: string;
  count: number;
  onAdd?: (status: StatusType) => void;
  value: string;
};

export default function HeaderStatusColumn({ status, count, value }: Props) {
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();
  const style = getStatusStyle(status);

  return (
    <div className=" rounded-lg flex items-center justify-between   p-3">
      <div className="flex  justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full ${style.dot}`} />

          <h3 className={`font-bold text-[#64748B] text-[11px]`}>{status}</h3>

          <span
            className={`text-xs font-bold px-[6px] py-[2px] rounded-xs ${style.count}`}
          >
            {count}
          </span>
        </div>
      </div>
      <div className="mb-3">
        <button
          onClick={() => {
            localStorage.setItem("selectedStatus", value);
            router.push(`/project/${projectId}/tasks/new`);
          }}
          className="text-gray-500 hover:cursor-pointer hover:text-black text-lg"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 6H0V4.5H4.5V0H6V4.5H10.5V6H6V10.5H4.5V6Z"
              fill="#94A3B8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
