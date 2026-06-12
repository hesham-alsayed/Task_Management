"use client";

export default function ProjectPageSkeleton() {
  return (
    <div className="p-2 animate-pulse">
      {/* Header */}
      <div className="sm:flex justify-between gap-2 hidden">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-16 rounded bg-skeleton" />
            <div className="h-3 w-3 rounded bg-skeleton" />
            <div className="h-3 w-28 rounded bg-skeleton" />
            <div className="h-3 w-3 rounded bg-skeleton" />
            <div className="h-3 w-12 rounded bg-skeleton" />
          </div>

          <div className="h-10 w-72 rounded bg-skeleton" />
        </div>

        <div className="flex items-end mb-2">
          <div className="h-10 w-45 rounded-sm bg-skeleton" />
        </div>
      </div>

      {/* Same container as page */}
      <div className="sm:max-w-240 w-full max-h-176 h-full mt-5 rounded-lg p-1 mx-auto">
        <div className="max-w-2xl w-full mx-auto rounded-lg sm:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          {/* Form */}
          <div className="sm:bg-white py-4 px-4 sm:px-8 w-full">
            {/* HeaderFormProject */}
            <div className="-mx-8 sm:border-b border-b-[#e6e7eb] px-8 py-4 sm:pb-10">
              <div className="flex items-center gap-4">
                <div className="w-[46px] h-[44px] hidden sm:block rounded-sm bg-skeleton" />

                <div className="flex-1">
                  <div className="h-7 w-52 rounded bg-skeleton mb-3" />
                  <div className="h-4 w-full max-w-md rounded bg-skeleton" />
                </div>
              </div>
            </div>

            {/* Fields */}
            <div className="form mt-4 space-y-4">
              {/* Title */}
              <div>
                <div className="h-4 w-32 rounded bg-skeleton mb-2" />

                <div className="h-11 w-full rounded-md bg-skeleton" />
              </div>

              {/* Description */}
              <div>
                <div className="flex justify-between mb-2">
                  <div className="h-4 w-24 rounded bg-skeleton" />
                  <div className="h-4 w-14 rounded bg-skeleton" />
                </div>

                <div className="h-37 w-full rounded-md bg-skeleton" />

                <div className="flex justify-end mt-2">
                  <div className="h-3 w-20 rounded bg-skeleton" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between py-6 gap-4">
                <div className="h-4 w-12 rounded bg-skeleton" />

                <div className="h-11 w-full sm:w-45 rounded-sm bg-skeleton" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="max-sm:mx-4 max-sm:flex-col bg-[#F1F3FF] p-8 flex gap-2">
            <div className="hidden sm:block h-5 w-5 rounded bg-skeleton" />

            <div className="flex-1 space-y-2">
              <div className="h-3 w-24 rounded bg-skeleton" />
              <div className="h-3 w-full rounded bg-skeleton" />
              <div className="h-3 w-3/4 rounded bg-skeleton" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
