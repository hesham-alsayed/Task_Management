"use client";

export default function TaskDetailsModalSkeleton() {
  return (
    <div className="flex h-full">
      <div className="w-[65%] flex flex-col justify-between h-full">
        <div className="px-8 py-6 space-y-4">
          <div className="bg-skeleton animate-pulse h-5 w-40 rounded" />
          <div className="bg-skeleton animate-pulse h-10 w-full rounded" />
        </div>

        <div className="px-8 space-y-3">
          <div className="bg-skeleton animate-pulse h-3 w-24 rounded" />
          <div className="bg-skeleton animate-pulse h-3 w-full rounded" />
          <div className="bg-skeleton animate-pulse h-3 w-[85%] rounded" />
          <div className="bg-skeleton animate-pulse h-3 w-[70%] rounded" />
        </div>

        <div className="px-8 py-6">
          <div className="bg-skeleton animate-pulse h-10 w-28 rounded" />
        </div>
      </div>

      <div className="w-[35%] bg-[#F1F3FF] border-l border-l-[#E8EDFF] px-4 py-6 space-y-6">
        <div className="bg-skeleton animate-pulse h-10 w-full rounded" />
        <div className="bg-skeleton animate-pulse h-14 w-full rounded" />
        <div className="bg-skeleton animate-pulse h-12 w-full rounded" />
        <div className="bg-skeleton animate-pulse h-12 w-full rounded" />
        <div className="bg-skeleton animate-pulse h-12 w-full rounded" />
      </div>
    </div>
  );
}