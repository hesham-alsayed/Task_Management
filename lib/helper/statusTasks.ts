export const statusConfig = [
  {
    status: "TO DO",
    dot: "bg-[#94A3B8]",
    count: "bg-[#E0E8FF] text-main",
  },
  {
    status: "IN PROGRESS",
    dot: "bg-primary",
    count: "bg-[#0052CC1A] text-primary",
  },
  {
    status: "BLOCKED",
    dot: "bg-[#BA1A1A]",
    count: "bg-[#FFDAD6] text-[#BA1A1A]",
  },
  {
    status: "IN REVIEW",
    dot: "bg-[#4F5F7B]",
    count: "bg-[#DCE6FF] text-[#4F5F7B]",
  },
  {
    status: "READY FOR QA",
    dot: "bg-[#7C3AED]",
    count: "bg-[#F3E8FF] text-[#7C3AED]",
  },
  {
    status: "REOPENED",
    dot: "bg-[#F59E0B]",
    count: "bg-[#FEF3C7] text-[#B45309]",
  },
  {
    status: "READY FOR PRODUCTION",
    dot: "bg-[#0891B2]",
    count: "bg-[#CFFAFE] text-[#0891B2]",
  },
  {
    status: "DONE",
    dot: "bg-[#16A34A]",
    count: "bg-[#DCFCE7] text-[#16A34A]",
  },
] as const;

export const getStatusStyle = (status: string) => {
  return statusConfig.find((s) => s.status === status) || statusConfig[0];
};
