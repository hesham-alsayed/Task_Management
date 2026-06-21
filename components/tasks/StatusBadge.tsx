import React from "react";

type Props = {
  status: string;
};
export default function StatusBadge({ status }: Props) {
const styles: Record<string, string> = {
    TO_DO: "bg-[#D7E2FF] text-[#434654]",

    IN_PROGRESS: "bg-[#CDDDFF] text-[#374763]",

    BLOCKED: "bg-[#FFDAD6] text-[#93000A]",

    IN_REVIEW: "bg-[#DCE6FF] text-[#4F5F7B]",

    READY_FOR_QA: "bg-[#F3E8FF] text-[#6B21A8]",

    REOPENED: "bg-[#FFF1D6] text-[#B45309]",

    READY_FOR_PRODUCTION: "bg-[#CFFAFE] text-[#0E7490]",

    DONE: "bg-[#82F9BE] text-[#002113]",
  };
  return (
    <span
      className={`rounded  px-3 py-1 text-[11px] font-bold ${
        styles[status] || styles.TO_DO
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
