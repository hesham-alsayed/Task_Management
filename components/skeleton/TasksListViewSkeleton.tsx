"use client";

export default function TasksListViewSkeleton() {
  return (
    <div className="mt-6 animate-pulse space-y-6">
      <div className="flex justify-between">
        <div>
          <div className="h-4 w-52 bg-skeleton rounded" />
          <div className="h-8 w-72 bg-skeleton rounded mt-6" />
          <div className="h-4 w-96 bg-skeleton rounded mt-3" />
        </div>

        <div className="flex items-end gap-4">
          <div className="w-[256px] h-10 bg-skeleton rounded-md" />
          <div className="w-32 h-10 bg-skeleton rounded-md" />
          <div className="w-10 h-10 bg-skeleton rounded-md" />
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-100">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-6 py-5"
            >
              <div className="h-3 w-16 rounded bg-skeleton" />

              <div className="h-3 w-[250px] rounded bg-skeleton" />

              <div className="h-6 w-20 rounded-full bg-skeleton" />

              <div className="h-3 w-24 rounded bg-skeleton" />

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-skeleton" />
                <div className="h-3 w-24 rounded bg-skeleton" />
              </div>

              <div className="h-4 w-4 rounded bg-skeleton" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <div className="h-3 w-40 rounded bg-skeleton" />

          <div className="flex items-center gap-4">
            <div className="h-4 w-4 rounded bg-skeleton" />
            <div className="h-3 w-24 rounded bg-skeleton" />
            <div className="h-4 w-4 rounded bg-skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
}
