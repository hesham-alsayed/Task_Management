"use client";

import React from "react";

function SkeletonBox({ className }: { className: string }) {
  return (
    <div className={`animate-pulse bg-skeleton rounded-md ${className}`} />
  );
}

export default function EpicListSkeleton() {
  return (
    <div className="max-lg:mx-4 space-y-10">
      <div className="flex md:items-center flex-col md:flex-row justify-between gap-6">
        <div className="hidden sm:block w-full md:w-[50%] space-y-3">
          <SkeletonBox className="h-4 w-40" />
          <SkeletonBox className="h-8 w-64 mt-4" />
        </div>

        <div className="flex items-center justify-center gap-4 w-full md:w-[50%]">
          <SkeletonBox className="h-[47px] w-full rounded-md" />

          <SkeletonBox className="h-[47px] w-30 hidden sm:block" />
        </div>
      </div>

      <div className="hidden sm:grid grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative w-full rounded-lg p-4 border border-gray-100 space-y-4"
          >
            <SkeletonBox className="h-6 w-24" />
            <SkeletonBox className="h-5 w-3/4" />

            <div className="flex items-center gap-3 mt-5">
              <SkeletonBox className="w-10 h-10 rounded-xl" />
              <div className="space-y-2">
                <SkeletonBox className="h-3 w-20" />
                <SkeletonBox className="h-3 w-32" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <SkeletonBox className="h-3 w-24" />
              <SkeletonBox className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>

      <div className="sm:hidden flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-full rounded-lg bg-white p-5 space-y-4">
            <div className="flex justify-between">
              <SkeletonBox className="h-5 w-20" />
              <SkeletonBox className="h-5 w-6" />
            </div>

            <SkeletonBox className="h-6 w-3/4" />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <SkeletonBox className="w-7 h-7 rounded-xl" />
                <div className="space-y-2">
                  <SkeletonBox className="h-3 w-20" />
                  <SkeletonBox className="h-2 w-16" />
                </div>
              </div>

              <div className="text-right space-y-2">
                <SkeletonBox className="h-3 w-16" />
                <SkeletonBox className="h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:flex justify-end">
        <SkeletonBox className="h-10 w-48" />
      </div>

      {/* MOBILE FAB SKELETON */}
      <div className="sm:hidden flex justify-end mt-10">
        <SkeletonBox className="w-12 h-12 rounded-sm" />
      </div>
    </div>
  );
}
