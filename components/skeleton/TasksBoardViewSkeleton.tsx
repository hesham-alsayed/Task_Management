export default function TasksBoardViewSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <div className="h-4 w-56 bg-skeleton rounded" />
          <div className="h-7 w-72 bg-skeleton rounded" />
          <div className="h-4 w-96 bg-skeleton rounded" />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-56 h-10 bg-skeleton rounded-md" />
          <div className="w-32 h-10 bg-skeleton rounded-md" />
          <div className="w-10 h-10 bg-skeleton rounded-md" />
        </div>
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto">
        {Array.from({ length: 4 }).map((_, colIndex) => (
          <div key={colIndex} className="w-[355px] flex-shrink-0">
            <div className="mb-4 space-y-2">
              <div className="h-5 w-44 bg-skeleton rounded" />
              <div className="h-4 w-24 bg-skeleton rounded" />
            </div>

            <div className="h-10 w-full bg-skeleton rounded-md mb-4" />

            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, cardIndex) => (
                <div key={cardIndex} className="h-28 w-full bg-skeleton rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
