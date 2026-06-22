"use client";

export default function TaskDetailsSkeletonMobile() {
  return (
    <div className="border-t w-full h-[600px] bg-[#f7f7f7] rounded-t-2xl p-6 space-y-6">
      <div className="bg-skeleton animate-pulse h-2 w-16 mx-auto rounded-full" />

      <div className="flex justify-between items-center">
        <div className="bg-skeleton animate-pulse h-4 w-20 rounded" />
        <div className="bg-skeleton animate-pulse h-6 w-6 rounded-full" />
      </div>

      <div className="bg-skeleton animate-pulse h-6 w-full rounded" />

      <div className="flex gap-2">
        <div className="bg-skeleton animate-pulse h-6 w-20 rounded-full" />
        <div className="bg-skeleton animate-pulse h-6 w-24 rounded-full" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-skeleton animate-pulse h-16 rounded-lg" />
        <div className="bg-skeleton animate-pulse h-16 rounded-lg" />
        <div className="bg-skeleton animate-pulse h-16 rounded-lg" />
        <div className="bg-skeleton animate-pulse h-16 rounded-lg" />
      </div>

      <div className="bg-skeleton animate-pulse h-4 w-28 rounded" />
      <div className="bg-skeleton animate-pulse h-20 w-full rounded" />
    </div>
  );
}