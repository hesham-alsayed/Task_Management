"use client";

function SkeletonBox({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse bg-skeleton rounded-md ${className}`}
    />
  );
}

export default function AddNewTaskSkeleton() {
  return (
    <div className="max-w-[940px] mx-auto max-sm:mt-8 max-md:mt-3">
      <div className="space-y-3">
        <SkeletonBox className="h-4 w-32" />
        <SkeletonBox className="h-8 w-64" />
      </div>

      <div className="bg-white p-6 rounded-lg mt-10 space-y-6">
        <div className="space-y-2">
          <SkeletonBox className="h-4 w-20" />
          <SkeletonBox className="h-12 w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-20" />
            <SkeletonBox className="h-11 w-full" />
          </div>

          <div className="space-y-2">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-11 w-full" />
          </div>
        </div>

        <div className="space-y-2">
          <SkeletonBox className="h-4 w-16" />
          <SkeletonBox className="h-11 w-full" />
        </div>

        <div className="space-y-2">
          <SkeletonBox className="h-4 w-24" />
          <SkeletonBox className="h-12 w-full" />
        </div>

        <div className="space-y-2">
          <SkeletonBox className="h-4 w-28" />
          <SkeletonBox className="h-32 w-full" />
        </div>

        <div className="flex justify-end gap-2">
          <SkeletonBox className="h-10 w-24" />
          <SkeletonBox className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}