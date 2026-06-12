"use client";

export default function MembersPageSkeleton() {
  return (
    <main className="animate-pulse">
      {/* Header */}
      <div className="sm:flex justify-between hidden">
        <div className="space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <div className="h-3 w-16 rounded bg-skeleton" />
            <div className="h-3 w-24 rounded bg-skeleton" />
            <div className="h-3 w-20 rounded bg-skeleton" />
          </div>

          {/* Title */}
          <div className="h-10 w-72 rounded bg-skeleton" />
        </div>

        {/* Button */}
        <div className="flex items-end mb-2">
          <div className="h-10 w-45 rounded bg-skeleton" />
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center mt-[70px]">
        <div className="relative max-w-[792px] w-full rounded-2xl border-t-6 border-b-6 border-l-6 border-[#F1F3FF] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_180px_80px] px-8 py-5">
            <div className="h-3 w-16 rounded bg-skeleton" />
            <div className="h-3 w-12 rounded bg-skeleton" />
            <div className="ml-auto h-3 w-14 rounded bg-skeleton" />
          </div>

          {/* Rows */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_180px_80px] items-center px-8 py-6 bg-white"
            >
              {/* Member */}
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-skeleton" />

                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-skeleton" />
                  <div className="h-3 w-48 rounded bg-skeleton" />
                </div>
              </div>

              {/* Role */}
              <div>
                <div className="h-7 w-20 rounded-full bg-skeleton" />
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <div className="h-6 w-6 rounded bg-skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}