"use client";

export default function TasksListViewSkeleton() {
  return (
    <div className="mt-6 animate-pulse">
      <div className="spcace-y-4 max-sm:mt-10">
        <div className="hidden lg:block bg-skeleton w-30 h-2 rounded"></div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="h-9 mt-6 rounded bg-skeleton w-[280px] max-md:mx-auto max-sm:mx-0 max-sm:w-full"></div>

            <div className="hidden md:block h-4 mt-3 rounded bg-skeleton w-[420px]"></div>
          </div>

          <div className="flex items-end gap-4 justify-end xl:mt-8">
            <div className="relative max-md:w-[180px] max-md:w-full max-md:mt-0 max-lg:-mt-40 w-[256px] max-sm:w-full">
              <div className="bg-skeleton w-full h-10 rounded-md"></div>
            </div>

            <div className="hidden lg:flex gap-2">
              <div className="bg-skeleton w-10 h-10 rounded-sm"></div>
              <div className="bg-skeleton w-10 h-10 rounded-sm"></div>
            </div>
          </div>

          <div className="sm:hidden w-full">
            <div className="bg-skeleton w-full h-[48px] rounded-md mt-3"></div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block mt-6 bg-white rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-100">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-5">
              <div className="h-3 w-16 bg-skeleton rounded" />
              <div className="h-3 w-[250px] bg-skeleton rounded" />
              <div className="h-6 w-20 bg-skeleton rounded-full" />
              <div className="h-3 w-24 bg-skeleton rounded" />

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-skeleton rounded-full" />
                <div className="h-3 w-24 bg-skeleton rounded" />
              </div>

              <div className="h-4 w-4 bg-skeleton rounded" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <div className="h-3 w-40 bg-skeleton rounded" />

          <div className="flex items-center gap-4">
            <div className="h-4 w-4 bg-skeleton rounded" />
            <div className="h-3 w-24 bg-skeleton rounded" />
            <div className="h-4 w-4 bg-skeleton rounded" />
          </div>
        </div>
      </div>

      <div className="sm:hidden mt-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="h-3 w-16 bg-skeleton rounded" />
              <div className="h-5 w-20 bg-skeleton rounded-full" />
            </div>

            <div className="h-5 w-3/4 bg-skeleton rounded" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-skeleton rounded-full" />
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-skeleton rounded" />
                  <div className="h-3 w-28 bg-skeleton rounded" />
                </div>
              </div>

              <div className="h-6 w-6 bg-skeleton rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
