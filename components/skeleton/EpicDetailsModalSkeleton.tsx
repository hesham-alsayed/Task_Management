"use client";
type Props = {};

export default function EpicDetailsModalSkeleton({}: Props) {
  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center">
      <div className="absolute inset-0 bg-[#041B3C33] backdrop-blur-[2px]" />

      <div className="relative z-10 mx-4 w-full max-w-2xl max-h-[95vh] bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 space-y-6 animate-pulse">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-skeleton rounded" />
              <div className="h-6 w-6 bg-skeleton rounded-full" />
            </div>

            <div className="h-7 w-2/3 bg-skeleton rounded" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-28 bg-skeleton rounded" />
            <div className="h-10 w-full bg-skeleton rounded" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="h-16 bg-skeleton rounded-lg" />
            <div className="h-16 bg-skeleton rounded-lg" />
            <div className="h-16 bg-skeleton rounded-lg" />
            <div className="h-16 bg-skeleton rounded-lg" />
          </div>

          <div className="flex items-center justify-between">
            <div className="h-4 w-20 bg-skeleton rounded" />
            <div className="h-8 w-28 bg-skeleton rounded-lg" />
          </div>

          <div className="hidden sm:block space-y-3">
            <div className="h-16 bg-skeleton rounded-xl" />
            <div className="h-16 bg-skeleton rounded-xl" />
            <div className="h-16 bg-skeleton rounded-xl" />
          </div>

          <div className="sm:hidden space-y-3">
            <div className="h-20 bg-skeleton rounded-lg" />
            <div className="h-20 bg-skeleton rounded-lg" />
          </div>

          <div className="h-12 w-full bg-skeleton rounded-lg" />
        </div>
      </div>
    </div>
  );
}
