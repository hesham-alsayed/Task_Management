import React from "react";

export default function CardProjectSkeleton() { 
  return (
    <div className="w-full h-[220px] bg-white px-4 py-2 rounded-md">
      <div className="space-y-4">
        <div className="h-32 w-full rounded bg-skeleton animate-pulse" />

        <div className="h-6 w-2/3 rounded bg-skeleton animate-pulse" />

        <div className="h-4 w-1/2 rounded bg-skeleton animate-pulse" />
      </div>
    </div>
  );
}
