import React from "react";

export default function CardProjectSkeleton() {
  return (
    <div className="w-full h-[220px] bg-white px-6 py-2 rounded-md">
      <div className="space-y-4">
        {/* Image / Banner */}
        <div className="h-32 w-full rounded bg-[#E8EDFF] animate-pulse" />

        {/* Title */}
        <div className="h-6 w-2/3 rounded bg-[#E8EDFF] animate-pulse" />

        {/* Description */}
        <div className="h-4 w-1/2 rounded bg-[#E8EDFF] animate-pulse" />
      </div>
    </div>
  );
}
