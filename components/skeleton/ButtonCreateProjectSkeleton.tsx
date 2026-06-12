import React from "react";

export default function ButtonCreateProjectSkeleton() {
  return (
    <div className="flex items-end">
      <div className="relative overflow-hidden rounded-md">
        {/* BASE */}
        <div className="w-55 h-12 bg-skeleton rounded-md" />

        {/* SHIMMER */}
        <div className="absolute inset-0 -translate-x-full" />
      </div>
    </div>
  );
}